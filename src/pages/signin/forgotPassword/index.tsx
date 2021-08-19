import React, { useRef, useState } from 'react';
// FORM DEPENDENCIES
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import FormValidator from '~/utils/formValidator';
// COMPONENTS
import InputComponent from '~/components/input';
import ButtonComponent from '~/components/button';
import ErrorComponent from '~/components/error';
import ModalComponent from '~/components/modal';
// API SERVICES
import { ForgotPassword, ValidateCode, ResetPassword } from '~/services/auth';
// STYLES
import * as S from './styles';
// ASSETS
import { LogoLight } from '~/assets/images';
// MODELS
import IForgotPasswordData from '~/models/forgotPassword';

interface IForgotPassword {
  emitCurrentForm: (value: 'signin') => void;
}

const ForgotPasswordComponent: React.FC<IForgotPassword> = ({
  emitCurrentForm,
}) => {
  /**
   * CONTROLA O GRUPO DE INPUTS QUE VÃO SER EXIBIDOS
   * O processo de redefinição de senha é divido em 3 etapas:
   * 1. Inserir o e-mail da conta a ser redefinida a senha.
   * 2. Validar o código recebido no e-mail.
   * 3. Caso o código esteja válido, permite que o usuário redefina a senha.
   */
  const [currentSection, setCurrentSection] = useState<
    'email' | 'code' | 'password'
  >('email');

  const [currentText, setCurrentText] = useState<string>(
    'Esqueceu sua senha? Insira o e-mail para redefini-la',
  ); // TEXTO PARA SER EXIBIDO EM CADA ETAPA DE REDEFINIÇÃO DE SENHA

  const [imutableData, setImutableData] = useState<IForgotPasswordData>(); // Formulário não mutável, para aumentar a segurança no processo de redefinição de senha.

  const [showModal, setShowModal] = useState<boolean>(false); // Controle de estada para exibir a modal.

  const formRef = useRef<FormHandles>(null); // Form Ref.

  const [isLoading, setIsLoading] = useState<boolean>(false); // Controle de estado de carregamento da requisição à API
  const [hasError, setHasError] = useState<boolean>(false); // Controle de estado de erros da requisição à API
  const [errorMessage, setErrorMessage] = useState<string>(''); // Controle de estado da mensagem de erro da requisição à API

  const handleSubmit = async (data: IForgotPasswordData) => {
    /**
     * DEFINE OS MÉTODOS PARA CADA ETAPA DO PROCESSO
     * 1º Etapa - Validar e-mail
     * 2º Etaoa - Validar código
     * 3º Etapa - Redefinir senha
     */

    // 1° ETAPA
    if (currentSection === 'email') {
      /**
       * DEFINE AS VALIDAÇÕES DO FORMULÁRIO NA 1º ETAPA
       * 1. E-mail - E-mail válido e obrigatório.
       */
      const rules = {
        email: Yup.string()
          .email('Informe um e-mail válido')
          .required('Este campo é obrigatório'), // 1
      };

      /**
       * VALIDAÇÕES DO FORMULÁRIO
       * 1. Valida o formulário
       * 2. Se houver erros, retorna por aqui e exibe os erros.
       */
      const validator = await FormValidator(data, rules); // 1
      if (validator.error) return formRef.current?.setErrors(validator.data); // 2

      setIsLoading(true); // Exibe a mensagem de "Carregando..." no botão do formulário

      /**
       * REQUISIÇÃO À API PARA ENVIAR UM E-MAIL DE REDEFINIÇÃO DE SENHA
       * 1. Se a requisição não tiver nenhum erro, avança para a próxima etapa.
       * 2. Se a requisição tiver erro, exibe o componente de error.
       * 3. Altera o controle de estado para identificar que a requisição terminou.
       */
      return ForgotPassword(data)
        .then(() => {
          setCurrentSection('code');
          setCurrentText(
            'Enviamos um código de verificação para o seu e-mail! Confirme-o para alterar sua senha.',
          );
          setHasError(false);
          setImutableData({ email: data.email });
        }) // 1
        .catch((error) => {
          setHasError(true);
          setErrorMessage(
            error?.response?.data?.message ||
              'Houve um erro interno, entre um contato com o suporte.',
          );
        }) // 2
        .finally(() => {
          setIsLoading(false);
        }); // 3
    }

    // 2º ETAPA
    if (currentSection === 'code') {
      /**
       * DEFINE AS VALIDAÇÕES DO FORMULÁRIO NA 2º ETAPA
       * 1. Code - Código obrigatório e de 6 dígitos.
       */
      const rules = {
        code: Yup.string()
          .required('Este campo é obrigatório')
          .length(6, 'Este campo precisa ter 6 dígitos'),
      }; // 1

      /**
       * VALIDAÇÕES DO FORMULÁRIO
       * 1. Valida o formulário
       * 2. Se houver erros, retorna por aqui e exibe os erros.
       */
      const validator = await FormValidator(data, rules); // 1
      if (validator.error) return formRef.current?.setErrors(validator.data); // 2

      data.email = imutableData?.email; // Utiliza o e-mail do formulário imutável, evitando a alteração deste campo no processo.
      setIsLoading(true); // Exibe a mensagem de "Carregando..." no botão do formulário

      /**
       * REQUISIÇÃO À API PARA VALIDAR O CÓDIGO RECEBIDO NO E-MAIL INFORMADO NA 1º ETAPA
       * 1. Se a requisição não tiver nenhum erro, avança para a próxima etapa.
       * 2. Se a requisição tiver erro, exibe o componente de error.
       * 3. Altera o controle de estado para identificar que a requisição terminou.
       */
      return ValidateCode(data)
        .then((response) => {
          setCurrentSection('password');
          setCurrentText('Insira a sua nova senha para redefini-la.');
          setHasError(false);
          setImutableData({
            email: imutableData?.email,
            code: data.code,
            id: response.data.id,
          });
        }) // 1
        .catch((error) => {
          setHasError(true);
          setErrorMessage(
            error?.response?.data?.message ||
              'Houve um erro interno, entre um contato com o suporte.',
          );
        }) // 2
        .finally(() => {
          setIsLoading(false);
        }); // 3
    }

    // 3º ETAPA

    /**
     * DEFINE AS VALIDAÇÕES DO FORMULÁRIO NA 3º ETAPA
     * 1. password - Senha obrigatória.
     * 2. confirmPassword - Confirmação de senha obrigatório e igual ao campo 'password'
     */
    const rules = {
      password: Yup.string().required('Este campo é obrigatório'),
      confirmPassword: Yup.string()
        .required('Este campo é obrigatório')
        .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais'),
    };

    /**
     * VALIDAÇÕES DO FORMULÁRIO
     * 1. Valida o formulário
     * 2. Se houver erros, retorna por aqui e exibe os erros.
     */
    const validator = await FormValidator(data, rules); // 1
    if (validator.error) return formRef.current?.setErrors(validator.data); // 2

    data.email = imutableData?.email; // Utiliza o e-mail do formulário imutável, evitando a alteração deste campo no processo.
    data.code = imutableData?.code; // Utiliza o código do formulário imutável, evitando a alteração deste campo no processo.
    data.id = imutableData?.id; // Utiliza o id do formulário imutável, evitando a alteração deste campo no processo.
    setIsLoading(true); // Exibe a mensagem de "Carregando..." no botão do formulário

    /**
     * REQUISIÇÃO À API PARA REDEFINIR A SENHA
     * 1. Se a requisição não tiver nenhum erro, exibe a modal para redefinir o usuário para o login.
     * 2. Se a requisição tiver erro, exibe o componente de error.
     * 3. Altera o controle de estado para identificar que a requisição terminou.
     */
    return ResetPassword(data)
      .then(() => {
        setShowModal(true);
      }) // 1
      .catch((error) => {
        setHasError(true);
        setErrorMessage(
          error?.response?.data?.message ||
            'Houve um erro interno, entre um contato com o suporte.',
        );
      }) // 2
      .finally(() => {
        setIsLoading(false);
      }); // 3
  };

  /**
   * MÉTODO PARA RETORNAR A ETAPA ANTERIOR OU PARA TELA DE LOGIN DE ACORDO COM A ETAPA ATUAL.
   * 1º - Se estiver na etapa de redefinir a senha, volta para etapa de validar código.
   * 2º - Se estiver na etapa de validar código, volta para etapa de inserir o e-mail.
   * 3º - Se estiver na etapa de inserir o e-mail, volta para a tela de login.
   */
  const handleBackButton = () => {
    if (currentSection === 'password') {
      setCurrentText(
        'Enviamos um código de verificação para o seu e-mail! Confirme-o para alterar sua senha.',
      );
      return setCurrentSection('code');
    }
    if (currentSection === 'code') {
      setCurrentText('Esqueceu sua senha? Insira o e-mail para redefini-la');
      return setCurrentSection('email');
    }
    return emitCurrentForm('signin');
  };

  const handleDismissModal = () => {
    setShowModal(false);
    emitCurrentForm('signin');
  }; // Fecha a modal e redireciona para a tela de login

  return (
    <>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <S.FormContainer>
          <button
            type="button"
            className="backButton"
            onClick={handleBackButton}
          >
            Voltar
          </button>
          <img src={LogoLight} alt="Authentication Logo" />
          {hasError ? <ErrorComponent message={errorMessage} /> : null}
          <S.Text>{currentText}</S.Text>
          {currentSection === 'email' ? (
            <S.InputContainer>
              <InputComponent name="email" placeholder="E-mail" />
            </S.InputContainer>
          ) : null}
          {currentSection === 'code' ? (
            <S.InputContainer>
              <InputComponent name="code" placeholder="Código de validação" />
            </S.InputContainer>
          ) : null}
          {currentSection === 'password' ? (
            <>
              <S.InputContainer>
                <InputComponent
                  type="password"
                  name="password"
                  placeholder="Senha"
                />
              </S.InputContainer>
              <S.InputContainer>
                <InputComponent
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme a senha"
                />
              </S.InputContainer>
            </>
          ) : null}
          <ButtonComponent type="submit" isLoading={isLoading}>
            Continuar
          </ButtonComponent>
        </S.FormContainer>
      </Form>
      {showModal ? (
        <ModalComponent dismissModal={handleDismissModal}>
          <S.ModalContainer>
            <h4>
              A sua senha foi alterada com sucesso! Você será redirecionado para
              o login.
            </h4>
            <ButtonComponent onClick={handleDismissModal}>
              Fechar
            </ButtonComponent>
          </S.ModalContainer>
        </ModalComponent>
      ) : null}
    </>
  );
};

export default ForgotPasswordComponent;

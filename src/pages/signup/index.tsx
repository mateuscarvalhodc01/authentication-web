import React, { useRef, useState } from 'react';
// ROUTER HOOK
import { useHistory } from 'react-router-dom';
// FORM DEPENDENCIES
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import FormValidator from '~/utils/formValidator';
// COMPONENTS
import ErrorComponent from '~/components/error';
import InputComponent from '~/components/input';
import ButtonComponent from '~/components/button';
import ModalComponent from '~/components/modal';
// API SERVICES
import { SignUp } from '~/services/auth';
// STYLES
import * as S from './styles';
// ASSETS
import { LogoLight } from '~/assets/images';

interface IFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const router = useHistory(); // Instância do hook de rotas.

  const [isLoading, setIsLoading] = useState<boolean>(false); // Controle de estado de carregamento da requisição à API
  const [hasError, setHasError] = useState<boolean>(false); // Controle de estado de erros da requisição à API
  const [errorMessage, setErrorMessage] = useState<string>(''); // Controle de estado da mensagem de erro da requisição à API

  const [showModal, setShowModal] = useState<boolean>(false); // Controle de estado para exibir a modal

  const formRef = useRef<FormHandles>(null); // Form Ref.

  const handleSubmit = async (data: IFormData) => {
    /**
     * DEFINE AS VALIDAÇÕES DO FORMULÁRIO
     * 1. name - Nome obrigatório
     * 2. email - E-mail válido e obrigatório.
     * 3. password - Senha obrigatória.
     * 4. confirmPassword - Confirmação de senha obrigatório e igual ao campo 'password'
     */
    const rules = {
      name: Yup.string().required('Este campo é obrigatório'),
      email: Yup.string()
        .email('Informe um e-mail válido')
        .required('Este campo é obrigatório'),
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

    setIsLoading(true); // Exibe a mensagem de "Carregando..." no botão do formulário

    /**
     * REQUISIÇÃO À API PARA CADASTRAR UM USUÁRIO
     * 1. Se a requisição não tiver nenhum erro, exibe a modal e redireciona o usuário para o login.
     * 2. Se a requisição tiver erro, exibe o componente de error.
     * 3. Altera o controle de estado para identificar que a requisição terminou.
     */
    return SignUp(data)
      .then(() => {
        setShowModal(true);
        setHasError(false);
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

  const handleDismissModal = () => {
    setShowModal(false);
    return router.push('/signin');
  }; // Fecha a modal e redireciona para a tela de login

  return (
    <>
      <S.Container>
        <S.ImageSide>
          <img src={LogoLight} alt="Authentication Logo" />
        </S.ImageSide>
        <S.ContentSide>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <S.FormContainer>
              <img src={LogoLight} alt="Authentication Logo" />
              {hasError ? <ErrorComponent message={errorMessage} /> : null}
              <S.Text>Cadastre-se para começar a utilizar o sistema.</S.Text>
              <S.InputContainer>
                <InputComponent name="name" placeholder="Nome" />
              </S.InputContainer>
              <S.InputContainer>
                <InputComponent name="email" placeholder="E-mail" />
              </S.InputContainer>
              <S.InputContainer>
                <InputComponent
                  name="password"
                  type="password"
                  placeholder="Senha"
                />
              </S.InputContainer>
              <S.InputContainer>
                <InputComponent
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirme a Senha"
                />
              </S.InputContainer>
              <ButtonComponent type="submit" isLoading={isLoading}>
                Cadastrar
              </ButtonComponent>
            </S.FormContainer>
            <S.Text className="signup">
              Já tem uma conta?{' '}
              <S.Span onClick={() => router.push('/signin')}>
                Faça login.
              </S.Span>
            </S.Text>
          </Form>
        </S.ContentSide>
      </S.Container>
      {showModal ? (
        <ModalComponent dismissModal={handleDismissModal}>
          <S.ModalContainer>
            <h4>
              Seu cadastro foi bem sucedido! Você será redirecionado para o
              login.
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

export default SignupPage;

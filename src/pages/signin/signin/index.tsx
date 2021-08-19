import React, { useRef, useState } from 'react';
// ROUTER HOOK
import { useHistory } from 'react-router-dom';
// FORM DEPENDENCIES
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import FormValidator from '~/utils/formValidator';
// COMPONENTS
import InputComponent from '~/components/input';
import ButtonComponent from '~/components/button';
import ErrorComponent from '~/components/error';
import CheckboxComponent from '~/components/checkbox';
// HOOKS
import { useAuth } from '~/hooks/auth';
// API SERVICES
import { SignIn } from '~/services/auth';
// STYLES
import * as S from './styles';
// ASSETS
import { LogoLight } from '~/assets/images';
// MODELS
import ISigninData from '~/models/signin';

interface ISignin {
  emitCurrentForm: (value: 'signin' | 'forgotPassword') => void;
}

const SigninComponent: React.FC<ISignin> = ({ emitCurrentForm }) => {
  const router = useHistory(); // Instância do hook de rotas.

  const { setToken, setUser } = useAuth(); // Hook para armazenar token e armazenar um usuário.

  const formRef = useRef<FormHandles>(null); // Form Ref.

  const [isLoading, setIsLoading] = useState<boolean>(false); // Controle de estado de carregamento da requisição à API
  const [hasError, setHasError] = useState<boolean>(false); // Controle de estado de erros da requisição à API
  const [errorMessage, setErrorMessage] = useState<string>(''); // Controle de estado da mensagem de erro da requisição à API

  const handleSubmit = async (data: ISigninData) => {
    /**
     * DEFINE AS VALIDAÇÕES DO FORMULÁRIO
     * 1. E-mail - E-mail válido e obrigatório.
     * 2. Password - Senha obrigatória.
     */
    const rules = {
      email: Yup.string()
        .email('Informe um e-mail válido')
        .required('Este campo é obrigatório'), // 1
      password: Yup.string().required('Este campo é obrigatório'), // 2
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
     * REQUISIÇÃO À API PARA AUTENTICAR UM USUÁRIO
     * 1. Se a requisição não tiver nenhum erro armazena o token, usuário e redireciona para a rota protegida.
     * 2. Se a requisição tiver erro, exibe o componente de error.
     * 3. Altera o controle de estado para identificar que a requisição terminou.
     */
    return SignIn(data)
      .then((response) => {
        setHasError(false);
        setToken(response.data.data.token);
        setUser(response.data.user);
        router.push('/');
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

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <S.FormContainer>
        <img src={LogoLight} alt="Authentication Logo" />
        {hasError ? <ErrorComponent message={errorMessage} /> : null}
        <S.Text>Faça login na sua conta</S.Text>
        <S.InputContainer>
          <InputComponent name="email" placeholder="E-mail" />
        </S.InputContainer>
        <S.InputContainer>
          <InputComponent name="password" type="password" placeholder="Senha" />
        </S.InputContainer>
        <S.FormOptions>
          <CheckboxComponent name="remember">Lembrar de mim</CheckboxComponent>
          <button
            type="button"
            onClick={() => emitCurrentForm('forgotPassword')}
          >
            Esqueci minha senha
          </button>
        </S.FormOptions>
        <ButtonComponent type="submit" isLoading={isLoading}>
          Entrar
        </ButtonComponent>
      </S.FormContainer>
      <S.Text className="signup">
        Ainda não tem uma conta?{' '}
        <S.Span onClick={() => router.push('/signup')}>
          Cadastre-se aqui.
        </S.Span>
      </S.Text>
    </Form>
  );
};

export default SigninComponent;

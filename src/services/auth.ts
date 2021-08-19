import { AxiosResponse } from 'axios';
import API from './api';

import ISignup from '~/models/signup';
import ISignin from '~/models/signin';
import IForgotPassword from '~/models/forgotPassword';

export const SignIn = (data: ISignin): Promise<AxiosResponse> =>
  API.post('/auth/signin', data);

export const SignUp = (data: ISignup): Promise<AxiosResponse> =>
  API.post('/auth/signup', data);

export const ForgotPassword = (data: IForgotPassword): Promise<AxiosResponse> =>
  API.post('/auth/forgot-password', data);

export const ValidateCode = (data: IForgotPassword): Promise<AxiosResponse> =>
  API.post('/auth/validate-code', data);

export const ResetPassword = (data: IForgotPassword): Promise<AxiosResponse> =>
  API.post('/auth/reset-password', data);

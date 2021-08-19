import axios from 'axios';

const baseURL = (): string => {
  return process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3333/v1'
    : 'https://mateuscarvalho.codecompany.app/api/authentication/v1';
};

const API = axios.create({
  baseURL: baseURL(),
});

export default API;

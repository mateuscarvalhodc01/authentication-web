import ITheme from '~/models/theme';

const lightTheme: ITheme = {
  colors: {
    primary: '#00acd7',
    secondary: '#2380d7',
    background: '#fff',
    contrast: '#000',
  },
};

const darkTheme: ITheme = {
  colors: {
    primary: 'blue',
    secondary: 'purple',
    background: '#000',
    contrast: '#fff',
  },
};

export { lightTheme, darkTheme };

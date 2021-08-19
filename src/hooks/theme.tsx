import React, { createContext, useContext, useState } from 'react';

import { ThemeProvider } from 'styled-components';

import { lightTheme } from '~/styles/themes';

interface IThemeContext {
  setCurrentTheme: (value: 'light') => void;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const useTheme = (): IThemeContext => {
  return useContext(ThemeContext);
};

const ThemeComponent: React.FC = ({ children }) => {
  // eslint-disable-next-line
  const [theme, setTheme] = useState<'light'>('light');

  const setCurrentTheme = (value: 'light') => {
    return setTheme(value);
  };

  const getCurrentTheme = () => {
    return lightTheme;
  };

  return (
    <ThemeContext.Provider value={{ setCurrentTheme }}>
      <ThemeProvider theme={getCurrentTheme()}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeComponent, useTheme };

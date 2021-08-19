import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeComponent } from './hooks/theme';
import { AuthComponent } from './hooks/auth';
import Routes from './routes';
import Styles from './styles';

function App(): JSX.Element {
  return (
    <BrowserRouter basename="/authentication">
      <AuthComponent>
        <ThemeComponent>
          <Styles />
          <Routes />
        </ThemeComponent>
      </AuthComponent>
    </BrowserRouter>
  );
}

export default App;

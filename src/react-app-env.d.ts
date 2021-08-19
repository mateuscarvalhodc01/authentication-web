/// <reference types="react-scripts" />

import ITheme from '~/models/theme';

import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}

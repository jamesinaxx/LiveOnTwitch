import type { DefaultTheme } from 'styled-components';

const light: DefaultTheme = {
  type: 'light',
  colors: {
    backgroundColor: '#FCFCFC',
    color: '#000',
    scrollbarColor: '#735bc7',
  },
};

const dark: DefaultTheme = {
  type: 'dark',
  colors: {
    backgroundColor: '#1e1f20',
    color: '#FFF',
    scrollbarColor: '#44357a',
  },
};

const Themes = {
  light,
  dark,
};

export default Themes;

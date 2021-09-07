import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getStorageLocal } from './lib/chromeapi';
import Main from './pages/main';
import { lightTheme, darkTheme } from './theme';

export default async function render() {
  // TODO Add better light mode vs dark mode scroll bars
  const GlobalStyle = createGlobalStyle`
    body::-webkit-scrollbar {
      width: 0.5em;
    }

    body::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.scrollbarColor};
      border-radius: 25px;
    }

    body {
      transition: background 100ms ease-in-out;
      // Width and height to cap extension size, Can cause issues with scrollbar showing when there is nothing to scroll
      width: 550px;
      height: 550px;
      background-color: ${props => props.theme.colors.backgroundColor};
      color: ${props => props.theme.colors.color};
    }
  `;

  const theme =
    (await getStorageLocal<'light' | 'dark'>('NowLive:Storage:Color')) ===
    'light'
      ? lightTheme
      : darkTheme;

  ReactDOM.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Main />
      </ThemeProvider>
    </StrictMode>,
    document.getElementById('root') as HTMLElement,
  );
}
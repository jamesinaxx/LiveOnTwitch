import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { render } from 'react-dom';
import browser from 'webextension-polyfill';
import {
  type DefaultTheme,
  ThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { getStorageLocal } from './lib/chromeapi';
import LoadingContext from './lib/LoadingContext';
import Main from './pages/main';
import Themes from './theme';

const Global = createGlobalStyle`
  body::-webkit-scrollbar {
    width: 0.5em;
  }

  body::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.scrollbarColor};
    border-radius: 25px;
  }

  body {
    background-color: ${(props) => props.theme.colors.backgroundColor};
    transition: background-color 100ms ease-in-out;
    color: ${(props) => props.theme.colors.color};
    width: 550px;
    height: 550px;
  }
`;

// TODO Add support for multiple pages of live streams
const App: FunctionComponent = () => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(Themes.light);
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const loadingState = useMemo(
    () => ({
      isLoading: loading,
      setLoading,
    }),
    [loading],
  );

  useEffect(() => {
    const updateTheme = async () => {
      const newTheme =
        Themes[(await getStorageLocal('NowLive:Theme')) || 'light'];

      setCurrentTheme(newTheme);
      setThemeLoaded(true);
    };

    updateTheme();
    browser.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local' && 'NowLive:Theme' in changes) {
        updateTheme();
      }
    });
  }, []);

  if (!themeLoaded) {
    return null;
  }

  return (
    <LoadingContext.Provider value={loadingState}>
      <ThemeProvider theme={currentTheme}>
        <Global />
        <Main />
      </ThemeProvider>
    </LoadingContext.Provider>
  );
};

if (process.env.PRODUCTION) {
  document.oncontextmenu = (e) => e.preventDefault();
}

render(<App />, document.getElementById('root'));

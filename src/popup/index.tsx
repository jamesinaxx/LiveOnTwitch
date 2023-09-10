import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';
import {
  type DefaultTheme,
  ThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import { getStorageLocal } from '../lib/chromeapi';
import LoadingContext from '../lib/LoadingContext';
import Main from '../pages/main';
import Themes from './theme';
import '@fontsource/noto-sans';

const Global = createGlobalStyle`
  body, html {
    // The following properties only apply to Firefox browsers
    scrollbar-width: 0.5em;
    scrollbar-color: ${(props) => props.theme.colors.scrollbarColor} black;
    font-family: "Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

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
const App: FunctionComponent<PropsWithChildren<unknown>> = () => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(Themes.light);
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateTheme = async () => {
      const theme = Themes[(await getStorageLocal('NowLive:Theme')) || 'light'];

      setCurrentTheme(theme);
      setThemeLoaded(true);
    };

    updateTheme();
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local' && 'NowLive:Theme' in changes) {
        updateTheme();
      }
    });
  }, []);

  const loadingContext = useMemo(
    () => ({
      isLoading: loading,
      setLoading,
    }),
    [loading, setLoading],
  );

  if (!themeLoaded) {
    // TODO: Add loading
    return null;
  }

  return (
    <LoadingContext.Provider value={loadingContext}>
      <ThemeProvider theme={currentTheme}>
        <Global />
        <Main />
      </ThemeProvider>
    </LoadingContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(<App />);

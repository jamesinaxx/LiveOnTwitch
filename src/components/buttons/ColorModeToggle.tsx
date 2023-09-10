import type { FunctionComponent, PropsWithChildren } from 'react';
import styled, { useTheme } from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { controlButton } from '../../popup/styleMixins';
import { setStorageLocal } from '../../lib/chromeapi';

interface ColorToggleProps {
  shown: boolean;
}

const ColorToggleButton = styled.button`
  ${controlButton(5)}
`;

const ColorToggle: FunctionComponent<PropsWithChildren<ColorToggleProps>> = ({
  shown,
}) => {
  const { type } = useTheme();

  return (
    <ColorToggleButton
      type="button"
      onClick={() =>
        setStorageLocal('NowLive:Theme', type === 'light' ? 'dark' : 'light')
      }
      style={{ opacity: shown ? '0%' : '100%' }}
    >
      {type === 'light' ? <FaSun /> : <FaMoon />}
    </ColorToggleButton>
  );
};

export default ColorToggle;

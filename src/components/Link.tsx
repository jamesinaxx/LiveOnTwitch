import type { FunctionComponent, PropsWithChildren } from 'react';
import { useTheme } from 'styled-components';
import { Anchor } from '../popup/styleMixins';

interface LinkProps {
  href: string;
}

const Link: FunctionComponent<PropsWithChildren<LinkProps>> = ({
  href,
  children,
}) => {
  const { type } = useTheme();

  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noreferrer"
      color={type === 'light' ? '#000' : '#fff'}
      hoverColor={type === 'light' ? '#504e4e' : '#cacaca'}
    >
      {children}
    </Anchor>
  );
};

export default Link;

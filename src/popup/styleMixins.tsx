import type { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';

export const buttonColor = '#724cf9';
export const buttonHover = '#6b4ecf';
export const buttonClicked = '#573eb0';

export const confirmButton = /* css */ `
  transition: background-color 100ms ease-in-out;
  width: 150px;
  height: 50px;
  letter-spacing: 0.5px;
  background-color: ${buttonColor};
  color: white;
  font-size: 2em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${buttonHover};
  }
  &:active {
    background-color: ${buttonClicked};
  }
`;

export const controlButton = (right: number): string => /* css */ `
  color: #fff;
  transition: all 100ms ease-in-out;
  width: 30px;
  height: 30px;
  position: fixed;
  top: 5px;
  right: ${right}px;
  background-color: ${buttonColor};
  box-shadow: 0 0 10px ${buttonColor};
  border-radius: 5px;
  border: 5px #000;
  text-align: center;
  padding: 5px;
  &:hover {
    background-color: ${buttonHover};
    box-shadow: 0 0 10px ${buttonHover};
    transform: scale(105%);
  }
  &:active {
    background-color: ${buttonClicked};
    box-shadow: 0 0 10px ${buttonClicked};
    transform: scale(105%);
  }
  svg {
    transition: color 100ms ease-in-out;
    transition: opacity 100ms ease-in-out;
  }
`;

export const smolText = /* css */ `
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: xx-large;
  color: rgb(179, 179, 179);
`;

export const animationChild = (
  delay: number,
  top: number,
  left: number,
): string => /* css */ `
  animation-delay: ${delay}s;
  &:after {
    top: ${top}px;
    left: ${left};
  }
`;

const SmolText = styled.small`
  ${smolText}
`;

export const SmallText: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => <SmolText>{children}</SmolText>;

interface AnchorType {
  href: string;
  hoverColor: string;
  color: string;
  target?: string;
  rel?: string;
}

const AnchorStyled = styled.a<{ hoverColor: string }>`
  transition: color 100ms ease-in-out;
  margin: 5px;
  text-decoration: none;
  color: ${(props) => props.color};
  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

export const Anchor: FunctionComponent<PropsWithChildren<AnchorType>> = (
  props,
  // eslint-disable-next-line react/jsx-props-no-spreading
) => <AnchorStyled {...props}>{props.children}</AnchorStyled>;

const FooterStyled = styled.footer`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50px;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 5px;
  margin: 0;
  border-top: 1px solid white;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.color};
`;

export const Footer: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => <FooterStyled>{children}</FooterStyled>;

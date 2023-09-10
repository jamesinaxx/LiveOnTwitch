import type { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { buttonClicked, buttonColor, buttonHover } from '../popup/styleMixins';

interface InvalidateTokenProps {
  onChoice: (invalidate: boolean) => void;
}

interface ChoiceButtonProps {
  onChoice: (confirm: boolean) => void;
  confirm: boolean;
}

const ChoiceButtonButton = styled.button<{ $confirm: boolean }>`
  transition: background-color 100ms ease-in-out;
  width: 150px;
  height: 50px;
  letter-spacing: 0.5px;
  background-color: ${buttonColor};
  color: white;
  font-size: 2em;
  border: none;
  cursor: pointer;
  border-radius: 1rem;

  &:hover {
    background-color: ${buttonHover};
  }
  &:active {
    background-color: ${buttonClicked};
  }

  &:first-of-type {
    margin-right: 1rem;
  }
`;

const ChoiceButton: FunctionComponent<PropsWithChildren<ChoiceButtonProps>> = ({
  onChoice,
  confirm,
  children,
}) => (
  <ChoiceButtonButton
    $confirm={confirm}
    onClick={() => onChoice(confirm)}
    type="button"
  >
    {children}
  </ChoiceButtonButton>
);

const InvalidateTokenContainer = styled.div`
  z-index: 1;
  transition: opacity 100ms ease-in-out;
  position: fixed;
  width: 550px;
  height: 550px;
  padding: 50px;
  backdrop-filter: blur(10px);
  text-align: center;
  left: -40px;
  top: -50px;
`;

const InvalidateToken: FunctionComponent<
  PropsWithChildren<InvalidateTokenProps>
> = ({ onChoice }) => {
  document.body.style.overflow = 'hidden';

  return (
    <InvalidateTokenContainer>
      <h1>
        Are you sure you want to sign out?
        <br />
        To continue using Now Live you will have to log in again
      </h1>
      <ChoiceButton onChoice={onChoice} confirm>
        Yes
      </ChoiceButton>
      <ChoiceButton onChoice={onChoice} confirm={false}>
        No
      </ChoiceButton>
    </InvalidateTokenContainer>
  );
};

export default InvalidateToken;

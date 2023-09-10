import type { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { smolText } from '../popup/styleMixins';

const NoAuthText = styled.small`
  text-align: center;
  a {
    transition: color 100ms ease-in-out;
    color: #05d1d1;
    text-decoration: none;
    &:hover {
      color: #048585;
    }
  }
  form {
    margin-top: 15px;
    button {
      margin-top: 15px;
    }
  }
  ${smolText}
`;

const NoAuth: FunctionComponent<PropsWithChildren<unknown>> = () => (
  <NoAuthText>
    You are not logged in to Twitch! Please go to{' '}
    <a
      href="https://nowlive.jewelexx.com/auth/"
      target="_blank"
      rel="noreferrer"
    >
      this page
    </a>
    , log in with Twitch, and then come back here.
  </NoAuthText>
);

export default NoAuth;

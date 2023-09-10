import type { FunctionComponent, PropsWithChildren } from 'react';
import { SmallText } from '../popup/styleMixins';

const NoLiveChannels: FunctionComponent<PropsWithChildren<unknown>> = () => (
  <SmallText>
    You do not follow anybody who is currently live
    <img
      src="https://cdn.frankerfacez.com/emoticon/425196/4"
      alt="Sadge Emote from FFZ"
    />
  </SmallText>
);

export default NoLiveChannels;

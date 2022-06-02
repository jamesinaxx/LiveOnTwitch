import {
  FunctionComponent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import browser from 'webextension-polyfill';
import Channel from '../components/Channel';
import { getStorage, getStorageLocal, setStorage } from '../lib/chromeapi';
import NoLiveChannels from '../components/NoLiveChannels';
import Container from '../components/Container';
import type { TwitchStream } from '../types/twitch';
import LoadingContext from '../lib/LoadingContext';

type ChannelsType = TwitchStream[] | undefined;

const updateChannels = async (
  setChannels: Dispatch<SetStateAction<ChannelsType>>,
) => setChannels(await getStorageLocal('NowLive:Channels'));

const Live: FunctionComponent = () => {
  const { isLoading } = useContext(LoadingContext);
  const [favoriteChannels, setFavoriteChannels] = useState<string[]>([]);
  const [channels, setChannels] = useState<ChannelsType>(undefined);

  useEffect(() => {
    browser.storage.onChanged.addListener(() => updateChannels(setChannels));
    (async () => {
      setChannels(await getStorageLocal('NowLive:Channels'));
      setFavoriteChannels((await getStorage('NowLive:Favorites')) || []);
    })();
  }, []);

  const toggleFavorite = (wasFave: boolean, userId: string) => {
    if (wasFave) {
      setFavoriteChannels((oldFaves) => {
        const newArray = oldFaves.filter((fav) => fav !== userId);
        setStorage('NowLive:Favorites', newArray);
        return newArray;
      });
    } else {
      setFavoriteChannels((oldFaves) => {
        const newArray = [...oldFaves, userId];
        setStorage('NowLive:Favorites', newArray);
        return newArray;
      });
    }
  };

  if (channels === undefined) {
    return null;
  }

  return (
    <Container>
      {channels.length === 0 && <NoLiveChannels />}
      {favoriteChannels.map((channelName) => {
        const channel = channels.find((c) => c.user_id === channelName);

        if (channel === undefined) return null;

        return (
          <Channel
            key={channel.id}
            data={channel}
            hidden={isLoading}
            favorite
            setFavorites={(old) => toggleFavorite(old, channel.user_id)}
          />
        );
      })}
      {channels
        .filter((channel) => !favoriteChannels.includes(channel.user_id))
        .map((channel) => (
          <Channel
            key={channel.id}
            data={channel}
            hidden={isLoading}
            setFavorites={(old) => toggleFavorite(old, channel.user_id)}
          />
        ))}
    </Container>
  );
};

export default Live;

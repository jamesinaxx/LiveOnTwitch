import {
  getChannelInfo,
  setStorageIfNull,
  setStorageLocalIfNull,
} from '../lib/chromeapi';
import { log } from '../lib/logger';
import validateToken from '../lib/validateToken';

chrome.alarms.create('NowLive:Refresh', {
  // delayInMinutes: 1,
  periodInMinutes: 1,
});

chrome.runtime.onInstalled.addListener(async () => {
  await setStorageLocalIfNull('NowLive:Theme', 'dark');
  await setStorageIfNull('NowLive:Favorites', []);
  await getChannelInfo();
  log('Initialized Now Live');
});

chrome.storage.onChanged.addListener((changes) => {
  if ('NowLive:Token' in changes) {
    getChannelInfo();
  }
});

chrome.runtime.onMessage.addListener((message, sender, res) => {
  if (!sender.url?.startsWith('https://nowlive.jewelexx.com/auth/callback')) {
    return false;
  }

  if (
    typeof message === 'object' &&
    message.name === 'NowLive:Token' &&
    typeof message.token === 'string'
  ) {
    validateToken(message.token).then((valid) => {
      if (valid) {
        res([`Received valid token: ${message.token}`, true]);
      } else {
        res([`Received invalid token: ${message.token}`, false]);
      }
    });
  } else {
    res([`Received invalid message object: ${message}`, false]);
  }
  return true;
});

getChannelInfo().then(() => {
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'NowLive:Refresh') {
      await getChannelInfo();
    }
  });
});

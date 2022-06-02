import browser from 'webextension-polyfill';
import {
  getChannelInfo,
  setStorageIfNull,
  setStorageLocalIfNull,
} from '../lib/chromeapi';
import { log } from '../lib/logger';
import validateToken from '../lib/validateToken';

browser.alarms.create('NowLive:Refresh', { delayInMinutes: 1 });

browser.runtime.onInstalled.addListener(async () => {
  await setStorageLocalIfNull('NowLive:Theme', 'dark');
  await setStorageIfNull('NowLive:Favorites', []);
  log('Initialized Now Live');
});

browser.storage.onChanged.addListener((changes) => {
  if ('NowLive:Token' in changes) {
    getChannelInfo();
  }
});

browser.runtime.onMessage.addListener((message, sender) => {
  if (!sender.url?.startsWith('https://nowlive.jamesinaxx.me/auth/callback')) {
    return Promise.reject();
  }

  return new Promise((res) => {
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
  });
});

getChannelInfo().then(() => {
  browser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'NowLive:Refresh') {
      await getChannelInfo();
    }
  });
});

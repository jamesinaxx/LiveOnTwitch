/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs-extra';
import type { Manifest } from 'webextension-polyfill';
import type PkgType from '../package.json';
import { isDev, r } from '../scripts/utils';

// eslint-disable-next-line import/prefer-default-export
export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 2,
    version: '1.2.1',
    description:
      'Instantly check which of your favorite Twitch streamers are live right from your favorite browser',
    name: 'Now Live',
    browser_action: {
      default_popup: 'dist/popup/index.html',
      default_title: 'See who is live',
    },
    background: {
      scripts: ['dist/background/index.mjs'],
    },
    icons: {
      16: 'assets/icons/16.png',
      32: 'assets/icons/32.png',
      48: 'assets/icons/48.png',
      64: 'assets/icons/64.png',
      96: 'assets/icons/96.png',
      128: 'assets/icons/128.png',
      256: 'assets/icons/256.png',
    },
    permissions: ['storage', 'alarms', '*://*.twitch.tv/*'],
    content_scripts: [
      {
        matches: ['*://nowlive.jewelexx.com/auth/callback'],
        js: ['dist/contentScripts/index.global.js'],
      },
    ],
  };

  // FIXME: not work in MV3
  if (isDev && false) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts;
    manifest.permissions?.push('webNavigation');
  }

  return manifest;
}

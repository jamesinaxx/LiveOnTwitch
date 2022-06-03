declare const manifest: Manifest;
export default manifest;

export interface Manifest {
  author: string;
  manifest_version: number;
  browser_action: BrowserAction;
  background: Background;
  icons: { [key: string]: IconString };
  permissions: string[];
  content_scripts: ContentScript[];
  [key: string]: unknown;
}

export type IconString = `icons/${number}.png`;

export interface Background {
  scripts: string[];
}

export interface BrowserAction {
  default_popup: string;
  default_title: string;
}

export interface ContentScript {
  matches: string[];
  js: string[];
}

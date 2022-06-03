import { EnvFile } from '../../pkg-env/index';

const env = new EnvFile();

export const clientId = env.client_id;

interface fetchOptions extends RequestInit {
  timeout?: number | undefined;
}

export async function fetchWithTimeout(
  resourcename: string,
  options?: fetchOptions | undefined,
): Promise<Response> {
  const timeout = options?.timeout || 60000;

  const controller = new AbortController();

  const timeoutId = setTimeout(controller.abort, timeout);

  const res = await fetch(resourcename, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  return res;
}

export async function checkConnection(): Promise<boolean> {
  try {
    await fetchWithTimeout('https://twitch.tv', {
      timeout: 10000,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export function getTitle(oldTitle: string): string {
  if (oldTitle.length > 25) {
    return `${oldTitle.substring(
      0,
      oldTitle.length - (oldTitle.length - 22),
    )}...`;
  }

  return oldTitle;
}

interface Obj {
  [key: string]: string;
}

export function objToParams(obj: Obj): string {
  return `?${Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}

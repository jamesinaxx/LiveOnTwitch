const authEl = document.getElementById('NowLiveAuthText');
const hash = window.location.hash.substring(1);
const hashResult = hash.split('&').reduce(
  (previous: { [key: string]: unknown }, item) => ({
    ...previous,
    [item.split('=')[0]]: item.split('=')[1],
  }),
  {},
);

chrome.runtime.sendMessage(
  {
    name: 'NowLive:Token',
    token: hashResult.access_token,
  },
  (res: [string, boolean]) => {
    const success = res[1];
    if (authEl !== null && authEl !== undefined && !success) {
      authEl.innerHTML = `<p style="color: red">We tried to send the token, but something went wrong... Please let me know <a href="https://github.com/jewlexx/NowLive/issues" style="color: #05d1d1">here</a> and include ${res[0]}</p>`;
    }
  },
);

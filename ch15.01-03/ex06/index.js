(() => {
  window.alert("お客様情報の登録を行います。");
  // eslint-disable-next-line no-undef
  const uap = new UAParser();
  uap.setUA(window.navigator.userAgent);
  const result = uap.getResult();
  const date = document.querySelector("#date");
  date.textContent = `${new Date().toLocaleDateString()}`;
  const browser = document.querySelector("#ua-browser");
  browser.textContent = `${result.browser.name} バージョン${result.browser.version}`;
  const device = document.querySelector("#ua-device");
  device.textContent = `${result.device.vendor} ${result.device.model}`;
  const os = document.querySelector("#ua-os");
  os.textContent = `${result.os.name} バージョン${result.os.version}`;
})();

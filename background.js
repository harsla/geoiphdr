var injecting = false,
  headerIndex = 0,
  ipAddressIndex = 0,
  header = { "name": "X-Forwarded-For", "value": "127.0.0.1" }
  injector = function (details) {
    details.requestHeaders.push(header);
    return { "requestHeaders": details.requestHeaders };
  },
  startInjecting = function (headerName, headerValue) {
    header.name = headerName;
    header.value = headerValue;
    console.log("injecting header -- " + header.name + ": " + header.value);
    if(!injecting) {
      console.log("started injecting");
      chrome.webRequest.onBeforeSendHeaders.addListener( injector,
        {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
      injecting = true;
      }
  },
  stopInjecting = function () {
    if(!injecting) return;
    console.log("stopped injecting");
    chrome.webRequest.onBeforeSendHeaders.removeListener(injector);
    injecting = false;
  };

//startInjecting("X-Forwarded-For", "4.188.168.0");

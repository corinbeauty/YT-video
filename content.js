window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data.type && event.data.type === "REQUEST_CAPTURE") {
        chrome.runtime.sendMessage({ action: "CAPTURE_SCREEN" }, (response) => {
            if (response && response.dataUrl) {
                window.postMessage({ type: "RECEIVE_CAPTURE", dataUrl: response.dataUrl }, "*");
            }
        });
    }
});

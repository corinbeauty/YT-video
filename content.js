window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    
    // 截圖指令
    if (event.data.type === "REQUEST_CAPTURE") {
        chrome.runtime.sendMessage({ action: "CAPTURE_SCREEN" }, (response) => {
            if (response && response.dataUrl) {
                window.postMessage({ type: "RECEIVE_CAPTURE", dataUrl: response.dataUrl }, "*");
            }
        });
    }
    // 放大指令
    else if (event.data.type === "REQUEST_MAXIMIZE") {
        chrome.runtime.sendMessage({ action: "MAXIMIZE_WINDOW" });
    }
    // 縮小指令
    else if (event.data.type === "REQUEST_MINIMIZE") {
        chrome.runtime.sendMessage({ action: "MINIMIZE_WINDOW" });
    }
});

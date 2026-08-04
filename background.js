chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "CAPTURE_SCREEN") {
        chrome.tabs.captureVisibleTab(sender.tab.windowId, { format: "jpeg", quality: 60 }, (dataUrl) => {
            sendResponse({ dataUrl: dataUrl });
        });
        return true; 
    }
});

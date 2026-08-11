chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 截圖功能 (保留之前的雙重保險寫法)
    if (request.action === "CAPTURE_SCREEN") {
        let targetWindowId = sender.tab ? sender.tab.windowId : chrome.windows.WINDOW_ID_CURRENT;
        chrome.tabs.captureVisibleTab(targetWindowId, { format: "jpeg", quality: 60 }, (dataUrl) => {
            if (chrome.runtime.lastError) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                     if(tabs.length > 0){
                         chrome.tabs.captureVisibleTab(tabs[0].windowId, { format: "jpeg", quality: 60 }, (retryDataUrl) => {
                             sendResponse({ dataUrl: retryDataUrl || null });
                         });
                     } else {
                         sendResponse({ error: "找不到活動分頁" });
                     }
                });
                return true;
            }
            if(dataUrl) sendResponse({ dataUrl: dataUrl });
        });
        return true; 
    }
    
    // 全新：接收放大視窗指令
    if (request.action === "MAXIMIZE_WINDOW") {
        if (sender.tab && sender.tab.windowId) {
            chrome.windows.update(sender.tab.windowId, { state: "maximized", focused: true });
        }
    }
    
    // 全新：接收縮小視窗指令
    if (request.action === "MINIMIZE_WINDOW") {
        if (sender.tab && sender.tab.windowId) {
            chrome.windows.update(sender.tab.windowId, { state: "minimized" });
        }
    }
});

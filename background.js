chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSalaryRange") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getSalaryRange" },
        (response) => {
          console.log("Response received from content script:", response);
          sendResponse(response);
        }
      );
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSalaryRange") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"],
    }).then((results) => {
      const salaryRange = results[0].result;
      console.log("Salary range retrieved:", salaryRange);
      sendResponse({ salaryRange });
    });
    return true;
  }
});

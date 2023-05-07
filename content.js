function getSalaryRange() {
  console.log("getSalaryRange() function called");
  const salaryRangeRegex = /\$\d{1,3}(?:,\d{3})?-?\$\d{1,3}(?:,\d{3})?/;
  const salaryRangeMatch = document.body.innerText.match(salaryRangeRegex);

  if (salaryRangeMatch) {
    console.log("Salary range found:", salaryRangeMatch[0]);
    return salaryRangeMatch[0];
  } else {
    console.log("No salary range found");
    return null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received from popup.js:", message);
  if (message.action === "getSalaryRange") {
    const salaryRange = getSalaryRange();
    console.log("Sending salary range to popup.js:", salaryRange);
    sendResponse({ salaryRange: salaryRange });
  }
});

function extractSalaryRangeFromPage() {
  console.log("extractSalaryRangeFromPage() function called");
  const salaryRangeRegex1 = /\$\d{1,3}(?:,\d{3})?\s*-\s*\$\d{1,3}(?:,\d{3})?|\$\d{1,3}k\s*-\s*\$\d{1,3}k|\$\d{3,}(?:,\d{3})?\s*-\s*\$\d{3,}(?:,\d{3})?/;
  const salaryRangeRegex2 = /\$\d{1,3}(?:,\d{3})?|\$\d{3,}(?:,\d{3})?/;
  const salaryRangeRegexes = [salaryRangeRegex1, salaryRangeRegex2];

  for (const regex of salaryRangeRegexes) {
    const salaryRangeMatch = document.body.innerText.match(regex);
    if (salaryRangeMatch) {
      console.log("Salary range found:", salaryRangeMatch[0]);
      return salaryRangeMatch[0];
    }
  }

  console.log("No salary range found");
  return null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received from popup.js:", message);
  if (message.action === "getSalaryRange") {
    const salaryRange = extractSalaryRangeFromPage();
    console.log("Sending salary range to popup.js:", salaryRange);
    sendResponse({ salaryRange: salaryRange });
  }
});

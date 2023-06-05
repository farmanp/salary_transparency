function getSalaryRange() {
  console.log("getSalaryRange() function called");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getSalaryRange" },
      (response) => {
        console.log("Response received from content script:", response);
        if (response && response.salaryRange) {
          const salaryRange = response.salaryRange;
          const salaryRangeElement = document.getElementById("salary-range");
          // make text green
          salaryRangeElement.style.color = "green";
          salaryRangeElement.textContent = salaryRange;
        } else {
          const salaryRangeElement = document.getElementById("salary-range");
          // make text red
          salaryRangeElement.style.color = "red";
          salaryRangeElement.textContent = "Salary range not found";
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("popup.js loaded");
  getSalaryRange();

  const reportButton = document.getElementById("report-button");
  const reportTextArea = document.getElementById("report-text");
  const reportCancel = document.getElementById("report-cancel");
  const reportSubmit = document.getElementById("report-submit");

  reportButton.addEventListener("click", () => {
    reportTextArea.style.display = "block"; // Show the report text area
    reportButton.style.display = "none"; // Hide the report button
    reportCancel.style.display = "inline-block"; // Show the report cancel button
    reportSubmit.style.display = "inline-block"; // Show the report submit button
  });

  reportCancel.addEventListener("click", () => {
    console.log("Report cancelled")
    reportCancel.style.display = "none"; // Hide the report cancel button
    reportSubmit.style.display = "none"; // Hide the report submit button
    reportTextArea.style.display = "none"; // Hide the report text area
    reportButton.style.display = "inline-block"; // Show the report button
  });

  reportSubmit.addEventListener("click", () => {
    console.log("Report text:", reportTextArea.value);
    reportTextArea.style.display = "none"; // Hide the report text area
    reportButton.style.display = "inline-block"; // Show the report button
    reportCancel.style.display = "none"; // Hide the report cancel button
    reportSubmit.style.display = "none"; // Hide the report submit button
  });
});

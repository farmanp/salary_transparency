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
});

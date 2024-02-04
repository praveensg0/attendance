// Function to generate options for a select element
function generateOptions(selectId, start, end, increment, suffix) {
  const selectElement = document.getElementById(selectId);

  for (let i = start; i <= end; i += increment) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${i}${suffix}`;
    selectElement.appendChild(option);
  }
}

// Generate options for "Target Attendance" select element
generateOptions("targetAttendance", 5, 100, 5, "%");

function clearForm() {
  // Store elements in variables for better performance
  const totalClassesInput = document.getElementById("totalClasses");
  const presentClassesInput = document.getElementById("presentClasses");
  const absentClassesInput = document.getElementById("absentClasses");
  const targetAttendanceInput = document.getElementById("targetAttendance");
  const resultContainer = document.getElementById("resultContainer");

  // Clear input values
  totalClassesInput.value = "";
  presentClassesInput.value = "";
  absentClassesInput.value = "";

  // Clear result
  if (resultContainer) {
    resultContainer.textContent = "";
  }
}

// Function to calculate attendance
function calculateAttendance() {
  // Store elements in variables for better performance
  const totalClassesInput = document.getElementById("totalClasses").value.trim();
  const presentClassesInput = document.getElementById("presentClasses").value.trim() || "0";
  const absentClassesInput = document.getElementById("absentClasses").value.trim() || "0";
  const targetAttendanceInput = document.getElementById("targetAttendance").value.trim();
  const resultContainer = document.getElementById("resultContainer");

  // Check if totalClassesInput is a valid number
  if (isNaN(totalClassesInput) || totalClassesInput === "") {
    showResult("Please enter a valid number for total classes.");
    return;
  }

  // Convert totalClassesInput to a number
  const totalClasses = parseFloat(totalClassesInput);

  // Check if other inputs are valid numbers
  if (isNaN(presentClassesInput) || isNaN(absentClassesInput) || targetAttendanceInput === "" || isNaN(targetAttendanceInput)) {
    showResult("Please enter valid numbers for present classes, absent classes, and target attendance.");
    return;
  }

  const presentClasses = parseFloat(presentClassesInput);
  const absentClasses = parseFloat(absentClassesInput);
  const targetAttendance = parseFloat(targetAttendanceInput);

  // Validate absentClasses and presentClasses to ensure they're not more than totalClasses
  if (absentClasses + presentClasses > totalClasses) {
    showResult("The sum of absent classes and present classes cannot be more than total classes.");
    return;
  }

  const remainingClasses = totalClasses - presentClasses - absentClasses;

  const requiredAttendance = Math.max(0, (targetAttendance / 100) * totalClasses - presentClasses);


  if (remainingClasses === Math.ceil(requiredAttendance)) {
    showResult(`Oops! You need to attend all remaining classes to achieve ${targetAttendance}% attendance. RIP!`);
    return;
  }

  if (remainingClasses === 0) {

    const percentage = ((presentClasses + remainingClasses) / totalClasses) * 100;
    showResult(`Looks like you don't have anymore classes remaining! btw your attendance is ${percentage.toFixed(2)}%`);
    return;
  }

  if (requiredAttendance > remainingClasses) {
    const percentage = ((presentClasses + remainingClasses) / totalClasses) * 100;

    showResult(`Even if you attend all remaining ${remainingClasses} classes, you will get ${percentage.toFixed(2)}% of attendance, and you won't achieve the target attendance. Consider obtaining a medical certificate.`);
    return;
  }

  const bunkableClasses = Math.min(remainingClasses, totalClasses - (presentClasses+absentClasses) - Math.ceil(requiredAttendance));

  const resultElement = document.getElementById("result");

  if (bunkableClasses < 0) {
    showResult("You have already achieved or exceeded the target attendance. Keep up the good work!");
  } else if (Math.min(remainingClasses, Math.ceil(requiredAttendance)) === 0) {
    showResult("You have already achieved or exceeded the target attendance. Keep up the good work!");
  } else if (presentClassesInput === "0" && absentClassesInput === "0") {
    resultElement.textContent = `You can bunk up to ${bunkableClasses} classes with a target attendance of ${targetAttendance}%.`;
  } else {
    resultElement.textContent = `Good start! You can bunk up to ${bunkableClasses} classes with a target attendance of ${targetAttendance}% make sure to attend an additional ${Math.min(remainingClasses, Math.ceil(requiredAttendance))} classes with ${presentClasses} classes present.`;
  }


  // After calculating attendance, scroll to the result section
  resultElement.style.marginTop = "30px"; // Adjust the margin to ensure the result is visible
  resultElement.scrollIntoView({ behavior: "smooth" });
}

// Function to display result
function showResult(message) {
  const resultContent = document.getElementById("result");
  const resultContainer = document.getElementById("resultContainer");

  if (resultContent && resultContainer) {
    resultContent.textContent = message;
    resultContainer.style.display = "block"; // Show the result container
  }
}

calculateAttendance();

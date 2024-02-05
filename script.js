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

// Set default value to 75%
document.getElementById("targetAttendance").value = 75;

function clearForm() {
  // Store elements in variables for better performance
  const totalClassesInput = document.getElementById("totalClasses");
  const presentClassesInput = document.getElementById("presentClasses");
  const absentClassesInput = document.getElementById("absentClasses");
  const resultContainer = document.getElementById("resultContainer");

  // Clear input values
  totalClassesInput.value = "";
  presentClassesInput.value = "";
  absentClassesInput.value = "";

  // Clear result
  if (resultContainer) {
    resultContainer.textContent = "";
    resultContainer.style.display = "none";
  }
}

function calculateAttendance() {
  const totalClassesInput = document.getElementById("totalClasses").value.trim();
  const presentClassesInput = document.getElementById("presentClasses").value.trim() || "0";
  const absentClassesInput = document.getElementById("absentClasses").value.trim() || "0";
  const targetAttendanceInput = document.getElementById("targetAttendance").value.trim();

  const totalClasses = parseFloat(totalClassesInput);
  const presentClasses = parseFloat(presentClassesInput);
  const absentClasses = parseFloat(absentClassesInput);
  const targetAttendance = parseFloat(targetAttendanceInput) || 5;

  const remainingClasses = totalClasses - (presentClasses + absentClasses);
  const requiredAttendance = Math.max(0, (targetAttendance / 100) * totalClasses - presentClasses);
  const bunkableClasses = Math.min(remainingClasses, totalClasses - (presentClasses + absentClasses) - Math.ceil(requiredAttendance));

  let message;

  // Validate totalClassesInput
  if (totalClassesInput === "" || isNaN(parseFloat(totalClassesInput)) || parseFloat(totalClassesInput) <= 0) {
    message = `Please enter a valid number for total classes.`;
  } else if (absentClasses + presentClasses > totalClasses) {
    message = `The sum of absent classes and present classes cannot be more than total classes.`;
  } else if (remainingClasses === 0) {
    const percentage = ((presentClasses + remainingClasses) / totalClasses) * 100;
    message = `Looks like you don't have any more classes remaining! Your attendance is ${percentage.toFixed(2)}%.`;
  } else if (requiredAttendance > remainingClasses) {
    const percentage = ((presentClasses + remainingClasses) / totalClasses) * 100;
    message = `Even if you attend all remaining ${remainingClasses} classes, you will get ${percentage.toFixed(2)}% of attendance, and you won't achieve the target attendance. Consider obtaining a medical certificate.`;
  } else if (remainingClasses === Math.ceil(requiredAttendance)) {
    message = `Oops! You need to attend all remaining classes to achieve ${targetAttendance}% attendance. RIP!`;
  } else {
    if (bunkableClasses < 0) {
      message = "You have already achieved or exceeded the target attendance. Keep up the good work!";
    } else if (Math.min(remainingClasses, Math.ceil(requiredAttendance)) === 0) {
      message = "You have already achieved or exceeded the target attendance. Keep up the good work!";
    } else if (presentClasses === 0 && absentClasses === 0 && totalClasses != '') {
      message = `You can bunk up to ${bunkableClasses} classes with a target attendance of ${targetAttendance}%.`;
    } else {
      message = `Good start! You can bunk up to ${bunkableClasses} classes with a target attendance of ${targetAttendance}%. Make sure to attend an additional ${Math.min(remainingClasses, Math.ceil(requiredAttendance))} classes with ${presentClasses} classes present.`;
    }
  }

  showResult(message);
}

// Function to display result
function showResult(message) {
  let resultElement = document.getElementById("result");
  const resultContainer = document.getElementById("resultContainer");

  if (!resultElement) {
    resultElement = document.createElement("div");
    resultElement.id = "result";
    resultContainer.appendChild(resultElement);
  }

  resultElement.textContent = message;
  resultContainer.style.display = "block";
  resultElement.classList.add("result");
  resultElement.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("calculateButton").addEventListener("click", calculateAttendance);

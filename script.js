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
  document.getElementById("totalClasses").value = "";
  document.getElementById("presentClasses").value = "";
  document.getElementById("absentClasses").value = "";
  document.getElementById("targetAttendance").value = "";

  // Clear result
  document.getElementById("result").textContent = "";
}

// Function to calculate attendance
function calculateAttendance() {
  const totalClassesInput = document.getElementById("totalClasses").value.trim();
  const presentClassesInput = document.getElementById("presentClasses").value.trim() || "0";
  const absentClassesInput = document.getElementById("absentClasses").value.trim() || "0";
  const targetAttendanceInput = document.getElementById("targetAttendance").value.trim();

  // Check if totalClassesInput is a valid number
  if (isNaN(totalClassesInput) || totalClassesInput === "") {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Please enter a valid number for total classes.";
    return;
  }

  // Convert totalClassesInput to a number
  const totalClasses = parseFloat(totalClassesInput);

  // Check if other inputs are valid numbers
  if (isNaN(presentClassesInput) || isNaN(absentClassesInput) || targetAttendanceInput === "" || isNaN(targetAttendanceInput)) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Please enter valid numbers for present classes, absent classes, and target attendance.";
    return;
  }

  const presentClasses = parseFloat(presentClassesInput);
  const absentClasses = parseFloat(absentClassesInput);
  const targetAttendance = parseFloat(targetAttendanceInput);

  // Validate absentClasses and presentClasses to ensure they're not more than totalClasses
  if (absentClasses + presentClasses > totalClasses) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "The sum of absent classes and present classes cannot be more than total classes.";
    return;
  }

  const remainingClasses = totalClasses - presentClasses - absentClasses;

  const requiredAttendance = (targetAttendance / 100) * totalClasses - presentClasses;

  if (remainingClasses === Math.ceil(requiredAttendance)) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Oops! You need to attend all remaining classes to achieve ${targetAttendance}% attendance. Negotiate wisely with your classes!`;
    return;
  }

  if (requiredAttendance > remainingClasses) {
    const percentage = ((presentClasses + remainingClasses) / totalClasses) * 100;

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Even if you attend all remaining ${remainingClasses} classes, you will get ${percentage.toFixed(2)}% of attendance, and you won't achieve the target attendance. Consider obtaining a medical certificate.`;
    return;
  }

  const bunkableClasses = Math.min(remainingClasses, totalClasses - presentClasses - Math.ceil(requiredAttendance));

  const resultElement = document.getElementById("result");

  if (presentClassesInput === "0" && absentClassesInput === "0") {
    resultElement.textContent = `You can bunk up to ${bunkableClasses} classes with a target attendance of ${targetAttendance}%.`;
  } else {
    resultElement.textContent = `Good start! Bunk up to ${bunkableClasses} classes with a target attendance of ${targetAttendance}% make sure to attend an additional ${Math.min(remainingClasses, Math.ceil(requiredAttendance))} classes with ${presentClasses} classes present.`;
  }
}

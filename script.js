
// Returns the average of an array of 3 scores.
// We divide by scores.length (not a typed 3) so there is only one place to change later.
function calculateAverage(scores) {
  const total = scores[0] + scores[1] + scores[2];
  return total / scores.length;
}

// Checks from the HIGHEST grade down.
// If we checked "average >= 50" first, an 85 would wrongly get a D.
function getLetterGrade(average) {
  if (average >= 80) {
    return "A";
  } else if (average >= 70) {
    return "B";
  } else if (average >= 60) {
    return "C";
  } else if (average >= 50) {
    return "D";
  } else {
    return "F";
  }
}

// A comparison already gives true or false, so no "if" is needed.
function hasPassed(average) {
  return average >= 50;
}

// Combines the three functions above into ONE object.
// It contains no grading rules of its own, so each rule lives in one place only.
function makeResult(scores) {
  const average = calculateAverage(scores);

  return {
    scores: scores,
    average: average,
    grade: getLetterGrade(average),
    passed: hasPassed(average)
  };
}

// Returns true only if the typed text is a number from 0 to 100.
// Empty text must be rejected first, because Number("") gives 0 and would pass.
function isValidScore(text) {
  if (text === "") {
    return false;
  }

  const number = Number(text);

  if (Number.isNaN(number)) {
    return false;
  }

  return number >= 0 && number <= 100;
}


// ==============================
// PART 2: Connecting to the web page
// ==============================

function showError(message) {
  const errorBox = document.getElementById("error");
  errorBox.textContent = message;
  errorBox.className = "error";                          // visible
  document.getElementById("results").className = "results hidden";  // hide old results
}

function showResult(result) {
  document.getElementById("error").className = "error hidden";
  document.getElementById("results").className = "results";

  // toFixed is used ONLY for display. The real average stays unrounded.
  document.getElementById("averageText").textContent = result.average.toFixed(2);
  document.getElementById("gradeText").textContent = result.grade;

  const statusElement = document.getElementById("statusText");

  if (result.passed) {
    statusElement.textContent = "PASS";
    statusElement.className = "status pass";
  } else {
    statusElement.textContent = "FAIL";
    statusElement.className = "status fail";
  }
}

// Runs when the button is clicked (see onclick in index.html)
function calculate() {
  // .value is always TEXT, even in a number box
  const text1 = document.getElementById("score1").value;
  const text2 = document.getElementById("score2").value;
  const text3 = document.getElementById("score3").value;

  if (!isValidScore(text1) || !isValidScore(text2) || !isValidScore(text3)) {
    showError("Please enter valid scores (0-100)");
    return;   // stop here, do not calculate
  }

  // Convert text to numbers. Without this, "80" + "70" would join into "8070".
  const scores = [Number(text1), Number(text2), Number(text3)];

  const result = makeResult(scores);
  showResult(result);
}
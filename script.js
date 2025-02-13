const checkboxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const errorLabel = document.querySelector(".error-level");

// Initialize localStorage with proper structure
let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: { name: "", completed: false },
  second: { name: "", completed: false },
  third: { name: "", completed: false },
};

// Initialize input values and checkbox states
inputFields.forEach((input) => {
  // Set initial values from localStorage
  input.value = allGoals[input.id].name;

  // Set initial completed state
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
});

// Checkbox click handler
checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const input = checkbox.nextElementSibling;
    const inputId = input.id;

    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value.trim();
    });

    if (allGoalsAdded) {
      // Toggle completed state
      checkbox.parentElement.classList.toggle("completed");
      allGoals[inputId].completed = !allGoals[inputId].completed;

      // Update progress
      const completedGoals = document.querySelectorAll(".completed").length;
      progressValue.style.width = `${(completedGoals / 3) * 100}%`;
      progressValue.querySelector(
        "span"
      ).textContent = `${completedGoals}/3 completed`;

      errorLabel.style.display = "none";
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
      errorLabel.style.display = "block";
    }
  });
});

// Input field handlers
inputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
    errorLabel.style.display = "none";
  });

  input.addEventListener("input", (e) => {
    // Update localStorage on every input change
    allGoals[input.id] = {
      name: e.target.value,
      completed: allGoals[input.id].completed, // Preserve completed state
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

// Initial progress calculation
const initialCompleted = document.querySelectorAll(".completed").length;
progressValue.style.width = `${(initialCompleted / 3) * 100}%`;
progressValue.querySelector(
  "span"
).textContent = `${initialCompleted}/3 completed`;

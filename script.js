const checkboxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector('.progress-value');
const errorLabel = document.querySelector(".error-level");  

checkboxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value.trim();  
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const completedGoals = document.querySelectorAll('.completed').length;
      progressValue.style.width = `${(completedGoals/3) * 100}%`;
      progressValue.querySelector('span').textContent = `${completedGoals}/3 completed`;
      errorLabel.style.display = 'none';  
    } else {
      progressBar.classList.add("show-error");
      errorLabel.style.display = 'block';  
    }
  });
});

inputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
    errorLabel.style.display = 'none';  
  });
});
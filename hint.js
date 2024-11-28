const hintContainer = document.getElementById("hint-container");

// Example hints array
const hints = [
  "Hint 1: The word starts with a consonant.",
  "Hint 2: The word has 5 letters.",
  "Hint 3: The second letter is a vowel.",
  "Hint 4: The word is a noun.",
  "Hint 5: The word is something you can eat.",
  "Hint 6: It is often red or green.",
  "Hint 7: It is a type of fruit."
];

// Generate 7 interactive word hints
for (let i = 1; i <= 7; i++) {
  const hintElement = document.createElement("div");
  hintElement.classList.add("hint");
  hintElement.innerHTML = `
    <label for="hint-${i}">Hint ${i}:</label>
    <input type="checkbox" id="hint-${i}" name="hint-${i}">
    <div class="hint-display-container" id="hint-display-container-${i}"></div>
  `;

  hintContainer.appendChild(hintElement);

  // Add event listener to show the hint when clicked
  const hintCheckbox = hintElement.querySelector(`#hint-${i}`);
  hintCheckbox.addEventListener("click", () => {
    if (hintCheckbox.checked) {
      displayHint(i - 1); // Display the corresponding hint
    } else {
      removeHint(i - 1); // Remove the hint if unchecked
    }
  });
}

function displayHint(index) {
  const hintDisplayContainer = document.getElementById(`hint-display-container-${index + 1}`);
  const hintDisplay = document.createElement("div");
  hintDisplay.classList.add("hint-display");
  hintDisplay.id = `hint-display-${index}`;
  hintDisplay.innerText = hints[index];
  hintDisplayContainer.appendChild(hintDisplay);

  // Add a small delay to allow the element to be added to the DOM before applying the 'show' class
  requestAnimationFrame(() => {
    hintDisplay.classList.add("show");
  });
}

function removeHint(index) {
  const hintDisplay = document.getElementById(`hint-display-${index}`);
  if (hintDisplay) {
    hintDisplay.classList.remove("show");
    hintDisplay.addEventListener('transitionend', () => {
      hintDisplay.parentElement.removeChild(hintDisplay);
    }, { once: true });
  }
}

const closeHintButton = document.getElementById("close-hint-button");
closeHintButton.addEventListener("click", () => {
  const hintDisplayContainers = document.querySelectorAll('.hint-display-container');
  hintDisplayContainers.forEach(container => container.innerHTML = ""); // Clear all displayed hints
  const checkboxes = hintContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = false); // Uncheck all checkboxes
});

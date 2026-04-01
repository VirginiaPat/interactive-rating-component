import * as State from "./state";
import * as UI from "./ui";

/**
 * Initialize app
 */
const init = () => {
  // Initialize DOM
  UI.initDOMElements();
  // Validates DOM elements and throw error in case one of them does not exist
  UI.validateDOMElements();
  // Setup event listeners
  setupEventListeners();
};

/**
 *Set up all event listeners
 */
const setupEventListeners = () => {
  // Rating numbers buttons
  const allNumbersBtns = document.querySelectorAll(".rate-number");
  allNumbersBtns.forEach((button, index) => {
    button.addEventListener("click", handleRateSelection);
    button.addEventListener("keydown", (e) => handleRateKeydown(e, index));
  });

  // Submit button
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", (e) => {
    // Stop propagation to prevent the document click listener from immediately closing the thank-you popup after submit
    e.stopPropagation();
    handleSubmit();
  });

  // Close thank you popup when pressing ESC key
  document.addEventListener("keydown", (e) => {
    const thankYouPopup = document.getElementById("thank-you-section");
    if (!thankYouPopup.classList.contains("hidden")) {
      if (e.key === "Escape") {
        State.reset();
        UI.hideThankYouPopUp();
        UI.hideStarImgs();
        UI.showRateAndSubmitSection();
      }
    }
  });

  // Close thank you popup when clicking anywhere on the screen (intentional: closes even on clicks inside the popup)
  document.addEventListener("click", (e) => {
    const thankYouPopup = document.getElementById("thank-you-section");

    if (!thankYouPopup.classList.contains("hidden")) {
      State.reset();
      UI.hideThankYouPopUp();
      UI.hideStarImgs();
      UI.showRateAndSubmitSection();
    }
  });
};

/**
 * Handles rate selection
 */
const handleRateSelection = (event) => {
  const selectedRateButton = event.currentTarget;
  const selectedRateNumber = Number(selectedRateButton.dataset.rate);
  const visibleStarImgs = UI.getActiveStars(selectedRateNumber);

  // Update state
  State.selectRateButton(selectedRateButton); //sets current selected button
  State.selectRate(selectedRateNumber); // sets current selected number

  // Update UI
  UI.deactivateRateNumbersBtns(); // Remove active state from other rating buttons
  UI.activateRateNumberBtn(selectedRateButton); //make selected button active
  UI.hideStarImgs(); //in case there are visible star images hide them
  UI.showStarImages(visibleStarImgs);
  UI.hideErrorMessage();
};

/**
 *
 * @param {event} e
 * @param {} index
 */
const handleRateKeydown = (e, index) => {
  const allNumbersBtns = document.querySelectorAll(".rate-number");
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    const next = allNumbersBtns[index + 1] ?? allNumbersBtns[0];
    next.focus();
    next.click();
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    const prev =
      allNumbersBtns[index - 1] ?? allNumbersBtns[allNumbersBtns.length - 1];
    prev.focus();
    prev.click();
  }
};

/**
 * Handles submit button click
 */
const handleSubmit = () => {
  // Show error if no rate number button is selected
  if (!State.state.selectedRateButton) {
    UI.showErrorMessage();
    return;
  }
  UI.hideRateAndSubmitSection();
  UI.showThankYouPopup();
  UI.popupDisplaySelectedRate(State.state.selectedRate);
};

/**
 * Start the app when DOM is ready
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

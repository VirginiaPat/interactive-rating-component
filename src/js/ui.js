let elements = {};

/**
 * Initializes DOM element preferences
 * Call this once when app starts
 */
export const initDOMElements = () => {
  elements = {
    starImages: {
      all: document.querySelectorAll(".star-img"),
      star1: document.getElementById("star-1"),
      star2: document.getElementById("star-2"),
      star3: document.getElementById("star-3"),
      star4: document.getElementById("star-4"),
      star5: document.getElementById("star-5"),
    },
    rateNumbersBtns: {
      all: document.querySelectorAll(".rate-number"),
      num1: document.getElementById("number-1"),
      num2: document.getElementById("number-2"),
      num3: document.getElementById("number-3"),
      num4: document.getElementById("number-4"),
      num5: document.getElementById("number-5"),
    },
    submitButton: document.getElementById("submit-button"),
    errorMessage: document.getElementById("submit-help"),
    rateAndSubmitSection: document.getElementById("rate-submit-section"),
    thankYouPopup: document.getElementById("thank-you-section"),
    popupSelectedRate: document.getElementById("selected-rate"),
  };
};

/**
 * Validates that all required DOM elements exist
 * @throws {Error} If any required element is missing
 */
export const validateDOMElements = () => {
  // Check individual elements
  const requiredSingleElements = [
    "submitButton",
    "errorMessage",
    "rateAndSubmitSection",
    "thankYouPopup",
    "popupSelectedRate",
  ];

  requiredSingleElements.forEach((key) => {
    if (!elements[key]) {
      throw new Error(`Required DOM element not found: ${key}`);
    }
  });

  // Check star images separately
  if (!elements.starImages?.all || elements.starImages.all.length !== 5) {
    throw new Error(
      `Expected 5 star images, found: ${elements.starImages?.all?.length ?? 0}`,
    );
  }

  // Check rate number buttons separately
  if (
    !elements.rateNumbersBtns?.all ||
    elements.rateNumbersBtns.all.length !== 5
  ) {
    throw new Error(
      `Expected 5 rate buttons, found: ${elements.rateNumbersBtns?.all?.length ?? 0}`,
    );
  }
};

/**
 * Deactivate number buttons when selected another one
 */
export const deactivateRateNumbersBtns = () => {
  elements.rateNumbersBtns.all.forEach((btn) => {
    btn.setAttribute("data-selected", "false");
    btn.setAttribute("aria-checked", "false");
    btn.classList.remove("active:bg-orange-500");
  });
};

/**
 * Activate number button
 */
export const activateRateNumberBtn = (element) => {
  const selectedElement = element;
  selectedElement.setAttribute("data-selected", "true");
  selectedElement.setAttribute("aria-checked", "true");
  selectedElement.classList.add("active:bg-orange-500");
};

/**
 * Returns array of stars elements (images) based on the selected rating number
 * @param {number} rate
 * @returns array of star images
 */
export const getActiveStars = (rate) => {
  const { star1, star2, star3, star4, star5 } = elements.starImages;
  if (rate === 1) {
    return [star1];
  } else if (rate === 2) {
    return [star1, star2];
  } else if (rate === 3) {
    return [star1, star2, star3];
  } else if (rate === 4) {
    return [star1, star2, star3, star4];
  } else if (rate === 5) {
    return [star1, star2, star3, star4, star5];
  }
};

/**
 * Hide star images
 */
export const hideStarImgs = () => {
  elements.starImages.all.forEach((star) => {
    star.classList.add("invisible");
  });
};

/**
 * Shows star images
 */
export const showStarImages = (arrayOfImgs) => {
  const activeStars = arrayOfImgs;
  activeStars.forEach((star) => {
    star.classList.remove("invisible");
  });
};

/**
 * Hides error message
 */
export const hideErrorMessage = () => {
  elements.errorMessage.classList.remove("flex");
  elements.errorMessage.classList.add("hidden");
};

/**
 * Shows error message when no number is selected
 */
export const showErrorMessage = () => {
  elements.errorMessage.classList.remove("hidden");
  elements.errorMessage.classList.add("flex");
};

/**
 * Display thank you Popup
 */
export const showThankYouPopup = () => {
  elements.thankYouPopup.classList.remove("hidden");
  elements.thankYouPopup.classList.add("flex");
};

/**
 * Hides thank you pop up
 */
export const hideThankYouPopUp = () => {
  elements.thankYouPopup.classList.remove("flex");
  elements.thankYouPopup.classList.add("hidden");
};

// Displays the selected rate in the thank you popup content
export const popupDisplaySelectedRate = (rate) => {
  elements.popupSelectedRate.textContent = rate;
};

/**
 * Display rate and submit section
 */
export const showRateAndSubmitSection = () => {
  elements.rateAndSubmitSection.classList.remove("hidden");
  elements.rateAndSubmitSection.classList.add("flex");
};

/**
 * Hides rate and submit section
 */
export const hideRateAndSubmitSection = () => {
  elements.rateAndSubmitSection.classList.remove("flex");
  elements.rateAndSubmitSection.classList.add("hidden");
};

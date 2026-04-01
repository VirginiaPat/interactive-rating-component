/**
 * State object
 */
export const state = {
  selectedRate: 0,
  selectedRateButton: null,
};

/**
 * Reset to initial state values
 */
export const reset = () => {
  state.selectedRate = 0;
  state.selectedRateButton = null;
};

/**
 * Set the selected rate number
 * @param {number} rate - the rate number selected by the user
 */
export const selectRate = (rate) => {
  state.selectedRate = rate;
};

/**
 * Set the selected button element
 * @param {element} element
 */
export const selectRateButton = (element) => {
  state.selectedRateButton = element;
};

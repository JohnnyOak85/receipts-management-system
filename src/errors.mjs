/**
 * Handles fetch errors by checking the response status.
 * @param {Response} response - The fetch response object.
 * @param {string} context - The context or description of the fetch operation.
 * @throws Will throw an error if the fetch operation failed.
 */
export const handleFetchError = ({ ok, statusText }, context) => {
  if (!ok) {
    throw new Error(`Failed to fetch ${context}: ${statusText}`);
  }
};

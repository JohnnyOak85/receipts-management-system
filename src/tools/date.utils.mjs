/**
 * Gets the current date details.
 * @returns {{ year: number, month: string, now: Date }} An object containing the current year, month, and date.
 */
export const getDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return { year, month, now };
};

/**
 * Creates a query string for the start date filter.
 * @returns {string} The start date filter query string.
 */
export const createStartDateFilterQuery = () => {
  const { year, month } = getDate();
  const day = "01";

  return `dataInicioFilter=${year}-${month}-${day}`;
};

/**
 * Creates a query string for the end date filter.
 * @returns {string} The end date filter query string.
 */
export const createEndDateFilterQuery = () => {
  const { year, month, now } = getDate();
  const day = String(now.getDate()).padStart(2, "0");

  return `dataFimFilter=${year}-${month}-${day}`;
};

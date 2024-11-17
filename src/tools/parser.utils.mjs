/**
 * Parses a numeric value by inserting a decimal point before the last two digits.
 * @param {number} value - The numeric value to parse.
 * @returns {number} The parsed value with a decimal point.
 */
export const parseValue = (value) => {
  const stringValue = value.toString();
  const integerPart = stringValue.slice(0, -2);
  const decimalPart = stringValue.slice(-2);

  return Number(`${integerPart}.${decimalPart}`);
};

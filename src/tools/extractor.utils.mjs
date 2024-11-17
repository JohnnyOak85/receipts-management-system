/**
 * Extracts a specific cookie from the headers.
 * @param {Headers} headers - The headers object containing cookies.
 * @param {string} cookieName - The name of the cookie to extract.
 * @returns {string} The extracted cookie.
 * @throws Will throw an error if the cookie is not found.
 */
const extractCookie = (headers, cookieName) => {
  const cookieHeader = headers.get("set-cookie");

  if (!cookieHeader) {
    throw "Set-Cookie headers not found";
  }

  const cookie = cookieHeader
    .replaceAll(", ", "")
    .split("; ")
    .find((cookie) => cookie.includes(cookieName));

  if (!cookie) {
    throw new Error(`Cookie ${cookieName} not found in headers`);
  }

  return cookie;
};

/**
 * Extracts the CSRF token from the HTML body.
 * @param {string} body - The HTML body containing the CSRF token.
 * @returns {string} The extracted CSRF token.
 * @throws Will throw an error if the CSRF token is not found.
 */
const extractCsrfToken = (body) => {
  const csrfTokenMatch = body.match(
    /<input[^>]*name="_csrf"[^>]*value="([^"]*)"/
  );

  const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

  if (!csrfToken) {
    throw new Error("CSRF token not found in HTML body");
  }

  return csrfToken;
};

/**
 * Extracts the value of a specific input field from the HTML body.
 * @param {string} body - The HTML body containing the input field.
 * @param {string} name - The name of the input field to extract the value from.
 * @returns {string} The extracted value.
 * @throws Will throw an error if the input field value is not found.
 */
const extractInputValue = (body, name) => {
  const match = body.match(
    new RegExp(`<input[^>]*name="${name}"[^>]*value="([^"]*)"`)
  );

  const value = match ? match[1] : null;

  if (!value) {
    throw new Error(`Value for ${name} not found in HTML body`);
  }

  return value;
};

export { extractCookie, extractCsrfToken, extractInputValue };

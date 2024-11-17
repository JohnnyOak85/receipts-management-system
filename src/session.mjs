import { ENDPOINTS } from "./constants.mjs";
import { handleFetchError } from "./errors.mjs";
import { extractCookie, extractCsrfToken } from "./tools/extractor.utils.mjs";

const { SESSION } = ENDPOINTS;
const { J_SESSION_ID } = HEADERS;

/**
 * Fetches the session and extracts necessary tokens.
 * @returns {Promise<{Cookie: string, _csrf: string}>} The session cookie and CSRF token.
 * @throws Will throw an error if the fetch operation fails.
 */
const fetchSession = async () => {
  try {
    const response = await fetch(SESSION);

    handleFetchError(response, "session");

    const body = await response.text();

    return {
      Cookie: extractCookie(response.headers, J_SESSION_ID),
      _csrf: extractCsrfToken(body),
    };
  } catch (error) {
    throw new Error(`Error in fetchSession: ${error}`);
  }
};

export { fetchSession };

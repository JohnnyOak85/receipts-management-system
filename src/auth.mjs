import { ENDPOINTS, HEADERS } from "./constants.mjs";
import { handleFetchError } from "./errors.mjs";
import { extractCookie, extractInputValue } from "./tools/extractor.utils.mjs";

const { LOGIN, LOGIN_SUBMISSION_URL } = ENDPOINTS;
const { J_SESSION_ID, SINGLE_DOMAIN_SSO_COOKIE } = HEADERS;

/**
 * Fetches user information.
 * @param {Object} session - The session object containing cookies and CSRF token.
 * @param {string} session.Cookie - The session cookie.
 * @param {string} session._csrf - The CSRF token.
 * @returns {Promise<{Cookie: string, form: {nif: string, partID: string, sessionID: string, sign: string, tc: string, tv: string, userID: string, userName: string}}>} The user information.
 * @throws Will throw an error if the fetch operation fails.
 */
export const fetchUserInfo = async ({ Cookie, _csrf }) => {
  try {
    const { USERNAME: username, PASSWORD: password } = process.env;

    if (!username || !password) {
      throw new Error("Username and password must be set.");
    }

    const response = await fetch(LOGIN_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie,
      },
      body: new URLSearchParams({ username, password, _csrf }),
    });

    handleFetchError(response, "user info");

    const body = await response.text();

    return {
      Cookie,
      form: {
        nif: extractInputValue(body, "nif"),
        partID: extractInputValue(body, "partID"),
        sessionID: extractInputValue(body, "sessionID"),
        sign: extractInputValue(body, "sign"),
        tc: extractInputValue(body, "tc"),
        tv: extractInputValue(body, "tv"),
        userID: extractInputValue(body, "userID"),
        userName: extractInputValue(body, "userName"),
      },
    };
  } catch (error) {
    throw new Error(`Error in fetchUserInfo: ${error.message}`);
  }
};

/**
 * Logs in the user.
 * @param {Object} session - The session object containing cookies and form data.
 * @param {string} session.Cookie - The session cookie.
 * @param {Object} session.form - The form data.
 * @returns {Promise<{jSessionId: string, ssoCookie: string}>} The session cookies.
 * @throws Will throw an error if the login operation fails.
 */
export const login = async ({ Cookie, form }) => {
  try {
    const response = await fetch(LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie,
      },
      body: new URLSearchParams({ ...form }),
    });

    handleFetchError(response, "login");

    const headers = response.headers;

    return {
      jSessionId: extractCookie(headers, J_SESSION_ID),
      ssoCookie: extractCookie(headers, SINGLE_DOMAIN_SSO_COOKIE),
    };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

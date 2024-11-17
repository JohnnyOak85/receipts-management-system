import { fetchUserInfo, login } from "./auth.mjs";
import { fetchReceipts, parseReceipts } from "./receipts.mjs";
import { fetchSession } from "./session.mjs";
import { saveReceiptsToFile } from "./tools/file.utils.mjs";

/**
 * Main function to orchestrate the fetching, parsing, and saving of receipts.
 * @returns {Promise<void>}
 */
const main = async () => {
  try {
    const session = await fetchSession();
    const payload = await fetchUserInfo(session);
    const cookies = await login(payload);
    const response = await fetchReceipts(cookies);
    const receipts = parseReceipts(response);
    saveReceiptsToFile(receipts);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

main();

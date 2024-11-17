import { writeFileSync } from "fs";

/**
 * Saves receipts to a JSON file.
 * @param {Array<{name: string, date: string, value: number, nif: string}>} receipts - The array of receipt objects to save.
 */
export const saveReceiptsToFile = (receipts) => {
  const outputDir = "output";
  const outputPath = join(outputDir, "receipts.json");

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  writeFileSync(outputPath, JSON.stringify(receipts, null, 2));
};

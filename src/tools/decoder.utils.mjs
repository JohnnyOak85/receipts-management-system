/**
 * A mapping of HTML entities to their corresponding characters.
 * @type {Object<string, string>}
 */
const htmlEntities = {
  "&atilde;": "ã",
  "&Atilde;": "Ã",
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
  "&quot;": '"',
  "&apos;": "'",
};

/**
 * Decodes HTML entities in a string to their corresponding characters.
 * @param {string} html - The string containing HTML entities.
 * @returns {string} The decoded string.
 */
const decodeHtmlEntities = (html) => {
  return html.replace(
    /&[a-zA-Z]+;/g,
    (entity) => htmlEntities[entity] || entity
  );
};

export { decodeHtmlEntities };

import { ENDPOINTS } from "./constants.mjs";
import { handleFetchError } from "./errors.mjs";
import {
  createEndDateFilterQuery,
  createStartDateFilterQuery,
} from "./tools/date.utils.mjs";
import { decodeHtmlEntities } from "./tools/decoder.utils.mjs";
import { parseValue } from "./tools/parser.utils.mjs";

const { RECEIPTS } = ENDPOINTS;

/**
 * Fetches receipts from the server.
 * @param {Object} session - The session object containing session IDs.
 * @param {string} session.jSessionId - The JSessionID cookie.
 * @param {string} session.ssoCookie - The SINGLE_DOMAIN_SSO_COOKIE cookie.
 * @returns {Promise<{
 *   success: boolean,
 *   messages: {
 *     error: Array<any>,
 *     success: Array<any>,
 *     info: Array<any>,
 *     warning: Array<any>
 *   },
 *   dataProcessamento: string,
 *   linhas: Array<{
 *     idDocumento: number,
 *     origemRegisto: string,
 *     origemRegistoDesc: string,
 *     nifEmitente: number,
 *     nomeEmitente: string,
 *     nifAdquirente: number,
 *     nomeAdquirente: string | null,
 *     paisAdquirente: string | null,
 *     nifAdquirenteInternac: string | null,
 *     tipoDocumento: string,
 *     tipoDocumentoDesc: string,
 *     numerodocumento: string,
 *     hashDocumento: string | null,
 *     dataEmissaoDocumento: string,
 *     valorTotal: number,
 *     valorTotalBaseTributavel: number,
 *     valorTotalIva: number,
 *     valorTotalBeneficioProv: number | null,
 *     valorTotalSetorBeneficio: number | null,
 *     valorTotalDespesasGerais: number | null,
 *     estadoBeneficio: string,
 *     estadoBeneficioDesc: string,
 *     estadoBeneficioEmitente: string,
 *     estadoBeneficioDescEmitente: string,
 *     existeTaxaNormal: number | null,
 *     actividadeEmitente: string,
 *     actividadeEmitenteDesc: string,
 *     actividaeProf: string | null,
 *     actividaeProfDesc: string | null,
 *     comunicacaoComerciante: boolean,
 *     comunicacaoConsumidor: boolean,
 *     isDocumentoEstrangeiro: boolean,
 *     atcud: string,
 *     autofaturacao: boolean
 *   }>,
 *   numElementos: number,
 *   totalElementos: number
 * }>} The fetched receipts.
 * @throws Will throw an error if the fetch operation fails.
 */
export const fetchReceipts = async ({ jSessionId, ssoCookie }) => {
  try {
    const startDateFilter = createStartDateFilterQuery();
    const endDateFilter = createEndDateFilterQuery();

    const response = await fetch(
      `${RECEIPTS}&${startDateFilter}&${endDateFilter}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: `${jSessionId}; ${ssoCookie}`,
        },
      }
    );

    handleFetchError(response, "receipts");

    const body = await response.text();

    return JSON.parse(decodeHtmlEntities(body));
  } catch (error) {
    throw new Error(`Failed to fetch receipts: ${error.message}`);
  }
};

/**
 * Parses the fetched receipts.
 * @param {Promise<{
 *   success: boolean,
 *   messages: {
 *     error: Array<any>,
 *     success: Array<any>,
 *     info: Array<any>,
 *     warning: Array<any>
 *   },
 *   dataProcessamento: string,
 *   linhas: Array<{
 *     idDocumento: number,
 *     origemRegisto: string,
 *     origemRegistoDesc: string,
 *     nifEmitente: number,
 *     nomeEmitente: string,
 *     nifAdquirente: number,
 *     nomeAdquirente: string | null,
 *     paisAdquirente: string | null,
 *     nifAdquirenteInternac: string | null,
 *     tipoDocumento: string,
 *     tipoDocumentoDesc: string,
 *     numerodocumento: string,
 *     hashDocumento: string | null,
 *     dataEmissaoDocumento: string,
 *     valorTotal: number,
 *     valorTotalBaseTributavel: number,
 *     valorTotalIva: number,
 *     valorTotalBeneficioProv: number | null,
 *     valorTotalSetorBeneficio: number | null,
 *     valorTotalDespesasGerais: number | null,
 *     estadoBeneficio: string,
 *     estadoBeneficioDesc: string,
 *     estadoBeneficioEmitente: string,
 *     estadoBeneficioDescEmitente: string,
 *     existeTaxaNormal: number | null,
 *     actividadeEmitente: string,
 *     actividadeEmitenteDesc: string,
 *     actividaeProf: string | null,
 *     actividaeProfDesc: string | null,
 *     comunicacaoComerciante: boolean,
 *     comunicacaoConsumidor: boolean,
 *     isDocumentoEstrangeiro: boolean,
 *     atcud: string,
 *     autofaturacao: boolean
 *   }>,
 *   numElementos: number,
 *   totalElementos: number
 * }>} rawReceipts - The raw receipts data.
 * @param rawReceipts.linhas - The array of raw receipt objects.
 * @returns {Array<{name: string, date: string, value: number, nif: string}>} The parsed receipts.
 */
export const parseReceipts = ({ linhas }) => {
  return linhas.map(
    ({ nomeEmitente, dataEmissaoDocumento, valorTotal, nifEmitente }) => ({
      name: nomeEmitente,
      date: dataEmissaoDocumento,
      value: parseValue(valorTotal),
      nif: nifEmitente,
    })
  );
};

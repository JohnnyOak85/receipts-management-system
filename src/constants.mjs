const URLS = {
  FINANCIAL_PORTAL_URL: "https://faturas.portaldasfinancas.gov.pt",
  GOVERNMENT_ACCESS_URL: "https://www.acesso.gov.pt/jsp",
};

const PATHS = {
  LOGIN: "painelAdquirente.action",
  RECEIPTS: "json/obterDocumentosAdquirente.action",
  LOGIN_REDIRECT: "loginRedirectForm.jsp",
  LOGIN_SUBMISSION: "submissaoFormularioLogin",
};

const QUERIES = {
  ACQUISITION_SCOPE_FILTER: "ambitoAquisicaoFilter=TODOS",
  PANEL_PATH: "path=painelAdquirente.action&partID=EFPF",
  AUTH_VERSION: "authVersion=1",
  SELECTED_AUTH_METHOD: "selectedAuthMethod=N",
};

export const ENDPOINTS = {
  LOGIN: `${URLS.FINANCIAL_PORTAL_URL}/${PATHS.LOGIN}`,
  LOGIN_SUBMISSION_URL: `${URLS.GOVERNMENT_ACCESS_URL}/${PATHS.LOGIN_SUBMISSION}?${QUERIES.PANEL_PATH}&${QUERIES.AUTH_VERSION}&${QUERIES.SELECTED_AUTH_METHOD}`,
  RECEIPTS: `${URLS.FINANCIAL_PORTAL_URL}/${PATHS.RECEIPTS}?${QUERIES.ACQUISITION_SCOPE_FILTER}`,
  SESSION: `${URLS.GOVERNMENT_ACCESS_URL}/${PATHS.LOGIN_REDIRECT}?${QUERIES.PANEL_PATH}`,
};

export const HEADERS = {
  J_SESSION_ID: "JSessionID",
  SINGLE_DOMAIN_SSO_COOKIE: "SINGLE_DOMAIN_SSO_COOKIE",
};

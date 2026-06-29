/* ============================================================
   AMIN REALTY, INC. — SITE CONFIGURATION
   ------------------------------------------------------------
   Set these once. The most important is logEndpoint: it is where
   every confidentiality signature is sent so you have a durable,
   timestamped record you can actually access.
   ============================================================ */
window.AMIN_CONFIG = {

  /* WHERE SIGNATURES ARE LOGGED  -----------------------------
     Paste a form endpoint URL here. Any of these work because the
     signature is sent as a standard form POST:
       • Formspree   → https://formspree.io/f/XXXXXXX
       • Web3Forms   → https://api.web3forms.com/submit  (also set web3formsKey below)
       • Google Apps Script Web App  → your /exec URL (logs to a Google Sheet)
     Leave blank to test locally (NOT for production — see requireRemoteLog). */
  logEndpoint: "",

  /* If you use Web3Forms, put your access key here (otherwise ignore). */
  web3formsKey: "",

  /* SECURITY POSTURE  ---------------------------------------
     true  = a file will NOT unlock unless the signature is successfully
             logged to logEndpoint above (recommended for production).
     false = if no endpoint is set, the signature is still saved locally
             in the visitor's browser and the download is allowed, with a
             visible warning. Use only while testing. */
  requireRemoteLog: false,

  /* Shown in the agreement and stored with each signature so you can tell
     which version a person agreed to. Bump this if you change the wording. */
  agreementVersion: "1.0",

  /* Where to email replies / who the agreement is "between". */
  companyName: "Amin Realty, Inc.",
  contactEmail: "info@aminrealtyinc.com"  /* [VERIFY] */
};

/* ============================================================
   AMIN REALTY, INC. — SECURE DOCUMENTS
   ------------------------------------------------------------
   THIS IS THE FILE YOU EDIT TO ADD OR REMOVE DOWNLOADABLE FILES.
   Each file is gated: a visitor must sign the confidentiality
   agreement before the download is unlocked, and every signature
   is logged (see assets/config.js to connect your log).

   To ADD a document:
     1) Put the actual file in the  documents/  folder
        (e.g. documents/offering-memorandum.pdf)
     2) Copy a { ... } block below and set:
          title, description, category, file, size
   To REMOVE a document: delete its { ... } block.

   FIELD REFERENCE
     title        name shown on the card
     description  one or two sentences
     category     short label/tag, e.g. "Offering Memorandum"
     file         path to the file, e.g. "documents/om-houston.pdf"
     size         text shown to the visitor, e.g. "PDF · 4.2 MB"
     icon         OPTIONAL "pdf" | "doc" | "sheet" | "zip" (default pdf)
   ============================================================ */
window.AMIN_DOCUMENTS = [
  {
    title:"Sample Offering Memorandum",
    description:"Confidential investment summary for a flagged select-service hotel, including financial highlights and market overview.",
    category:"Offering Memorandum",
    file:"documents/SAMPLE-offering-memorandum.txt",
    size:"Sample file",
    icon:"pdf"
  },
  {
    title:"Sample Confidentiality Agreement (NDA)",
    description:"The buyer-side non-disclosure agreement template used before sharing deal materials. Provided here as a reference copy.",
    category:"Legal",
    file:"documents/SAMPLE-confidentiality-agreement.txt",
    size:"Sample file",
    icon:"doc"
  },
  {
    title:"Sample Property Financials",
    description:"Trailing-12-month operating statement and key performance indicators for a representative hospitality asset.",
    category:"Financials",
    file:"documents/SAMPLE-property-financials.txt",
    size:"Sample file",
    icon:"sheet"
  }
];

/** ============================================================
 * AMIN REALTY, INC. — Deal Room / Signature email endpoint
 * (Google Apps Script — free, no server needed)
 * ------------------------------------------------------------
 * What it does on every deal-room access or document signature:
 *   1. Appends a row to a Google Sheet (your permanent log)
 *   2. Emails YOU a notification
 *   3. Emails THE CLIENT a confirmation with their file links
 *
 * SETUP (about 5 minutes):
 *   1. Go to https://sheets.new and create a blank spreadsheet
 *      named e.g. "Amin Realty Access Log". Copy its ID from the
 *      URL (the long string between /d/ and /edit).
 *   2. In the spreadsheet: Extensions → Apps Script. Delete the
 *      sample code and paste this whole file.
 *   3. Fill in OWNER_EMAIL and SHEET_ID below.
 *   4. Click Deploy → New deployment → type: Web app.
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Click Deploy, authorize, and copy the Web app URL
 *      (it ends in /exec).
 *   5. In assets/config.js on your website set:
 *        logEndpoint: "PASTE-THE-/exec-URL-HERE",
 *        sendsConfirmationEmail: true,
 *        requireRemoteLog: true,   // recommended for production
 *   6. Test: open a deal room on your site, submit, and check
 *      the sheet + both inboxes. (Gmail free quota: ~100
 *      recipients/day — plenty for this.)
 * ============================================================ */

var OWNER_EMAIL = "info@aminrealtyinc.com";        // [VERIFY] where notifications go
var SHEET_ID    = "PASTE-YOUR-SPREADSHEET-ID";     // from the sheet URL
var COMPANY     = "Amin Realty, Inc.";

function doPost(e) {
  var p = (e && e.parameter) || {};
  var isDealRoom = p.kind === "deal-room";

  // ---- 1. Log to the sheet ----
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["When", "Kind", "Listing / Document", "Name", "Email",
                       "Company", "Signature", "Files", "Page", "User agent", "Record ID"]);
    }
    sheet.appendRow([
      new Date(), p.kind || "", p.document || "", p.name || "", p.email || "",
      p.company || "", p.signature || "", p.file || "", p.page || "",
      p.userAgent || "", p.id || ""
    ]);
  } catch (err) {
    // Still try to send the emails even if the sheet write fails.
  }

  // ---- 2. Email the owner ----
  var subject = (isDealRoom ? "Deal room access: " : "Signature: ") +
                (p.document || "") + " — " + (p.name || "");
  var ownerBody =
    "Name:      " + (p.name || "") + "\n" +
    "Email:     " + (p.email || "") + "\n" +
    (p.company ? "Company:   " + p.company + "\n" : "") +
    "For:       " + (p.document || "") + "\n" +
    "Files:     " + (p.file || "") + "\n" +
    "When:      " + (p.timestampLocal || new Date().toString()) + "\n" +
    "Page:      " + (p.page || "") + "\n" +
    "Record ID: " + (p.id || "");
  try { MailApp.sendEmail(OWNER_EMAIL, subject, ownerBody); } catch (err) {}

  // ---- 3. Email the client a confirmation ----
  if (p.email) {
    var links = "";
    try {
      JSON.parse(p.filesJson || "[]").forEach(function (f) {
        links += "  • " + f.label + "\n    " + f.url + "\n";
      });
    } catch (err) {
      links = "  " + (p.file || "") + "\n";
    }
    var clientSubject = isDealRoom
      ? "Your deal room access — " + COMPANY
      : "Your signed confidentiality acknowledgment — " + COMPANY;
    var clientBody =
      "Hello " + (p.firstName || p.name || "") + ",\n\n" +
      (isDealRoom
        ? "This confirms your access to the deal room for:\n\n  " +
          (p.listing || p.document || "") + "\n\nYour materials:\n" + links
        : "This confirms your confidentiality acknowledgment for:\n\n  " +
          (p.document || "") + "\n") +
      "\nThese materials are confidential and provided only to evaluate a " +
      "possible transaction. Please do not share them.\n\n" +
      "Questions? Just reply to this email.\n\n" +
      COMPANY + "\n3 Sugarcreek Center, Sugar Land, TX 77478";
    try { MailApp.sendEmail(p.email, clientSubject, clientBody, { name: COMPANY }); } catch (err) {}
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

const escapeHtml = (unsafeHTML) =>
  unsafeHTML
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

module.exports = {
  escapeHtml,
};

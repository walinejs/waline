exports.isNetlify = think.env === 'netlify';
// oxlint-disable-next-line no-underscore-dangle
exports.netlifyFunctionPrefix = `/.netlify/functions/${process.env?._HANDLER?.replace(
  /\.handler$/,
  '',
)}`;

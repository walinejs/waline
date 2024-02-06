exports.isNetlify = think.env === 'netlify';
exports.netlifyFunctionPrefix = `/.netlify/functions/${process.env?._HANDLER?.replace(
  /\.handler$/,
  '',
)}`;

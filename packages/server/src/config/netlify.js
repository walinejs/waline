exports.isNetlify =
  process.env.NETLIFY_IMAGES_CDN_DOMAIN && process.env._HANDLER;
exports.netlifyFunctionPrefix = `/.netlify/functions/${process.env?._HANDLER?.replace(
  /\.handler$/,
  '',
)}`;

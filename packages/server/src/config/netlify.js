const isNetlify = think.env === 'netlify';
// oxlint-disable-next-line no-underscore-dangle
const netlifyFunctionPrefix = `/.netlify/functions/${process.env?._HANDLER?.replace(
  /\.handler$/u,
  '',
)}`;

module.exports = {
  isNetlify,
  netlifyFunctionPrefix,
};

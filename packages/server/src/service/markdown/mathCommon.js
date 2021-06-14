/*
 * Test if potential opening or closing delimieter
 * Assumes that there is a "$" at state.src[pos]
 */
const isValidDelim = (state, pos) => {
  const prevChar = pos > 0 ? state.src.charAt(pos - 1) : '';
  const nextChar = pos + 1 <= state.posMax ? state.src.charAt(pos + 1) : '';
  return {
    canOpen: nextChar !== ' ' && nextChar !== '\t',
    /*
     * Check non-whitespace conditions for opening and closing, and
     * check that closing delimeter isn’t followed by a number
     */
    canClose: !(
      prevChar === ' ' ||
      prevChar === '\t' ||
      /[0-9]/u.exec(nextChar)
    ),
  };
};

const inlineTex = (state, silent) => {
  let match;
  let pos;
  let res;
  let token;

  if (state.src[state.pos] !== '$') return false;
  res = isValidDelim(state, state.pos);

  if (!res.canOpen) {
    if (!silent) state.pending += '$';
    state.pos += 1;
    return true;
  }
  /*
   * First check for and bypass all properly escaped delimieters
   * This loop will assume that the first leading backtick can not
   * be the first character in state.src, which is known since
   * we have found an opening delimieter already.
   */
  const start = state.pos + 1;

  match = start;
  while ((match = state.src.indexOf('$', match)) !== -1) {
    /*
     * Found potential $, look for escapes, pos will point to
     * first non escape when complete
     */
    pos = match - 1;
    while (state.src[pos] === '\\') pos -= 1;
    // Even number of escapes, potential closing delimiter found
    if ((match - pos) % 2 === 1) break;
    match += 1;
  }

  // No closing delimter found.  Consume $ and continue.
  if (match === -1) {
    if (!silent) state.pending += '$';
    state.pos = start;
    return true;
  }

  // Check if we have empty content, ie: $$.  Do not parse.
  if (match - start === 0) {
    if (!silent) state.pending += '$$';
    state.pos = start + 1;
    return true;
  }

  // Check for valid closing delimiter
  res = isValidDelim(state, match);

  if (!res.canClose) {
    if (!silent) state.pending += '$';
    state.pos = start;
    return true;
  }

  if (!silent) {
    token = state.push('inlineTex', 'math', 0);
    token.markup = '$';
    token.content = state.src.slice(start, match);
  }

  state.pos = match + 1;

  return true;
};

const blockTex = (state, start, end, silent) => {
  let firstLine;
  let lastLine;
  let next;
  let lastPos;
  let found = false;
  let pos = state.bMarks[start] + state.tShift[start];
  let max = state.eMarks[start];

  if (pos + 2 > max) return false;
  if (state.src.slice(pos, pos + 2) !== '$$') return false;
  pos += 2;

  firstLine = state.src.slice(pos, max);

  if (silent) return true;

  if (firstLine.trim().endsWith('$$')) {
    // Single line expression
    firstLine = firstLine.trim().slice(0, -2);
    found = true;
  }

  for (next = start; !found; ) {
    next += 1;
    if (next >= end) break;
    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];
    if (pos < max && state.tShift[next] < state.blkIndent)
      // non-empty line with negative indent should stop the list:
      break;
    if (state.src.slice(pos, max).trim().endsWith('$$')) {
      lastPos = state.src.slice(0, max).lastIndexOf('$$');
      lastLine = state.src.slice(pos, lastPos);
      found = true;
    }
  }

  state.line = next + 1;

  const token = state.push('blockTex', 'math', 0);

  token.block = true;
  token.content =
    ((firstLine === null || firstLine === void 0 ? void 0 : firstLine.trim())
      ? `${firstLine}\n`
      : '') +
    state.getLines(start + 1, next, state.tShift[start], true) +
    ((lastLine === null || lastLine === void 0 ? void 0 : lastLine.trim())
      ? lastLine
      : '');
  token.map = [start, state.line];
  token.markup = '$$';

  return true;
};

module.exports = {
  inlineTex,
  blockTex,
};

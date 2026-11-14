module.exports = function validateOAuthRedirect(value, { serverUrl, secureDomains } = {}) {
  if (typeof value !== 'string' || /[\\\s]/u.test(value)) return null;

  // Root-relative destinations stay on this server without trusting request headers.
  if (value.startsWith('/') && !value.startsWith('//')) return value;

  try {
    const target = new URL(value);
    if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password) {
      return null;
    }

    const domains = Array.isArray(secureDomains) ? secureDomains : [secureDomains];
    const trusted = [serverUrl, ...domains].filter((entry) => typeof entry === 'string');
    const allowed = trusted.some((entry) => {
      try {
        if (entry.includes('://')) return new URL(entry).origin === target.origin;
        return !target.port && entry === target.hostname;
      } catch {
        return false;
      }
    });

    return allowed ? target.href : null;
  } catch {
    return null;
  }
};

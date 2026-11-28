const isAdminPath = (pathname) => pathname === '/ui' || pathname.startsWith('/ui/');

export const getAdminRedirect = (redirect, origin) => {
  // Check the raw path before URL parsing can normalize slashes or dot segments.
  const [pathname] = redirect.split(/[?#]/u, 1);

  if (!isAdminPath(pathname) || pathname.includes('\\')) {
    return null;
  }

  const target = new URL(redirect, origin);

  if (target.origin !== origin || !isAdminPath(target.pathname)) {
    return null;
  }

  return `${target.pathname}${target.search}${target.hash}`;
};

import request from '../utils/request.js';

export const getSites = () => request({ url: 'site', method: 'GET' });
export const createSite = (data) => request({ url: 'site', method: 'POST', body: data });
export const updateSite = (siteId, data) =>
  request({ url: `site?siteId=${encodeURIComponent(siteId)}`, method: 'PUT', body: data });
export const setDefaultSite = (siteId) =>
  request({ url: 'site', method: 'POST', body: { action: 'default', siteId } });
export const deleteSite = (siteId) =>
  request({ url: `site?siteId=${encodeURIComponent(siteId)}`, method: 'DELETE' });
export const grantSiteAdmin = (siteId, userId) =>
  request({ url: 'site', method: 'POST', body: { action: 'grant', siteId, userId } });
export const revokeSiteAdmin = (siteId, userId) =>
  request({ url: 'site', method: 'POST', body: { action: 'revoke', siteId, userId } });

/// <reference types="user-agent-data-types" />

export const userAgent = async (): Promise<string> => {
  if (!navigator) {
    return '';
  }

  const { userAgentData } = navigator;
  let ua = navigator.userAgent;

  // https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11
  if (!userAgentData || userAgentData.platform !== 'Windows') {
    return ua;
  }

  const { platformVersion } = await userAgentData.getHighEntropyValues([
    'platformVersion',
  ]);

  if (!platformVersion) {
    return ua;
  }

  const isWindows11Later = parseInt(platformVersion.split('.')[0]) >= 13;

  if (isWindows11Later) {
    ua = ua.replace('Windows NT 10.0', 'Windows NT 11.0');
  }

  return ua;
};

// NOTE: These types are forked from "user-agent-data-types" package

// WICG Spec: https://wicg.github.io/ua-client-hints

declare global {
  interface Navigator {
    readonly userAgentData?: NavigatorUAData;
  }
}

// https://wicg.github.io/ua-client-hints/#dictdef-navigatoruabrandversion
interface NavigatorUABrandVersion {
  readonly brand: string;
  readonly version: string;
}

// https://wicg.github.io/ua-client-hints/#dictdef-uadatavalues
interface UADataValues {
  readonly brands?: NavigatorUABrandVersion[];
  readonly mobile?: boolean;
  readonly platform?: string;
  readonly architecture?: string;
  readonly bitness?: string;
  readonly formFactor?: string[];
  readonly model?: string;
  readonly platformVersion?: string;
  /** @deprecated in favour of fullVersionList */
  readonly uaFullVersion?: string;
  readonly fullVersionList?: NavigatorUABrandVersion[];
  readonly wow64?: boolean;
}

// https://wicg.github.io/ua-client-hints/#dictdef-ualowentropyjson
interface UALowEntropyJSON {
  readonly brands: NavigatorUABrandVersion[];
  readonly mobile: boolean;
  readonly platform: string;
}

// https://wicg.github.io/ua-client-hints/#navigatoruadata
interface NavigatorUAData extends UALowEntropyJSON {
  getHighEntropyValues(hints: string[]): Promise<UADataValues>;
  toJSON(): UALowEntropyJSON;
}

export const userAgent = async (): Promise<string> => {
  const { userAgentData } = navigator;
  let ua = navigator.userAgent;

  // https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11
  if (userAgentData?.platform !== 'Windows') {
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

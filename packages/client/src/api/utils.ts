export interface FetchErrorData {
  errno: number;
  errmsg: string;
}

export const JSON_HEADERS: Record<string, string> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Content-Type': 'application/json',
};

export const errorCheck = <T = unknown>(
  data: T | FetchErrorData,
  name = ''
): T => {
  if (typeof data === 'object' && (data as FetchErrorData).errno)
    throw new TypeError(
      `Fetch ${name} failed with ${(data as FetchErrorData).errno}: ${
        (data as FetchErrorData).errmsg
      }`
    );

  return data as T;
};

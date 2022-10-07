import { WalineComment } from '../typings';
import { errorCheck } from './utils';

export interface FetchUserListOptions {
  serverURL: string;
  pageSize: number;
  signal: AbortSignal;
  lang: string;
}

export interface WalineUser
  extends Pick<WalineComment, 'nick' | 'link' | 'avatar' | 'label' | 'level'> {
  count: number;
}

export const fetchUserList = ({
  serverURL,
  signal,
  pageSize,
  lang,
}: FetchUserListOptions): Promise<WalineUser[]> => {
  return fetch(`${serverURL}/user?pageSize=${pageSize}&lang=${lang}`, {
    signal,
  })
    .then(
      (resp) =>
        resp.json() as Promise<{
          errno: number;
          message: string;
          data: WalineUser[];
        }>
    )
    .then((resp) => errorCheck(resp, 'user list'))
    .then((resp) => resp.data);
};

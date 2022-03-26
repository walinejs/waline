import { getUserInfo } from '../../utils';

import type { Config, UserInfo } from '../../utils';

export const USERINFO = 'ui';
export const PREVIEW_HTML_CONTENT = 'phc';

export interface CommentBoxState {
  [USERINFO]: Record<string, never> | UserInfo;
  [PREVIEW_HTML_CONTENT]: string;
}

export const getState = (config: Config): CommentBoxState => {
  /*
   * internalData
   */

  const state: CommentBoxState = {
    [USERINFO]: getUserInfo(),
    [PREVIEW_HTML_CONTENT]: '',
  };

  return state;
};

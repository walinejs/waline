import { createApp, h, reactive, watchEffect } from 'vue';

import Waline from './components/Waline.vue';
import { commentCount } from './comment';
import { pageviewCount } from './pageview';
import { getRoot } from './utils';

import type { WalineInitOptions, WalineProps } from './typings';

export interface WalineInstance {
  el: HTMLElement | null;
  update: (newOptions: Partial<WalineProps>) => void;
  destroy: () => void;
}

export const init = ({
  el = '#waline',
  path = window.location.pathname,
  comment = false,
  pageview = false,
  ...initProps
}: WalineInitOptions): WalineInstance | null => {
  // check el element
  const root = el ? getRoot(el) : null;

  // check root
  if (el && !root) throw new Error(`Option 'el' do not match any domElement!`);

  // check serverURL
  if (!initProps.serverURL) throw new Error("Option 'serverURL' is missing!");

  const props = reactive({ ...initProps });
  const state = reactive({ comment, pageview, path });

  const updateCommentCount = (): void => {
    if (state.comment)
      commentCount({
        serverURL: props.serverURL,
        path: state.path,
        selector: typeof state.comment === 'string' ? state.comment : undefined,
      });
  };

  const updatePageviewCount = (): void => {
    if (state.pageview)
      pageviewCount({
        serverURL: props.serverURL,
        path: state.path,
        selector:
          typeof state.pageview === 'string' ? state.pageview : undefined,
      });
  };

  const app = root
    ? createApp(() => h(Waline, { path: state.path, ...props }))
    : null;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (app) app.mount(root!);

  updateCommentCount();
  updatePageviewCount();

  const stopComment = watchEffect(updateCommentCount);
  const stopPageview = watchEffect(updatePageviewCount);

  return {
    el: root,
    update: ({
      comment,
      pageview,
      path = window.location.pathname,
      ...newProps
    }: Partial<Omit<WalineInitOptions, 'el'>>): void => {
      Object.entries(newProps).map(([key, value]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line
        props[key] = value;
      });

      state.path = path;
      if (comment !== undefined) state.comment = comment;
      if (pageview !== undefined) state.pageview = pageview;
    },
    destroy: (): void => {
      app?.unmount();
      stopComment();
      stopPageview();
    },
  };
};

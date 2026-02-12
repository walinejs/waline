import type { App } from 'vue';
import { createApp, h, reactive, watchEffect } from 'vue';

import { commentCount } from './comment.js';
import Waline from './components/WalineComment.vue';
import { pageviewCount } from './pageview.js';
import type { WalineInitOptions } from './typings/index.js';
import { getRoot, isString } from './utils/index.js';

export interface WalineInstance {
  /**
   * Waline 被挂载到的元素
   *
   * @description 当通过 `el: null` 初始化，值为 `null`
   *
   * Element where Waline is mounted
   *
   * @description when initialized with `el: null`, it will be `null`
   */
  el: HTMLElement | null;

  /**
   * 更新 Waline 实例
   *
   * @description 只要不设置`path` 选项，更新时它就会被重置为 `windows.location.pathname`
   *
   * Update Waline instance
   *
   * @description when not setting `path` option, it will be reset to `window.location.pathname`
   */
  update: (newOptions?: Partial<Omit<WalineInitOptions, 'el'>>) => void;

  /**
   * 取消挂载并摧毁 Waline 实例
   *
   * Unmount and destroy Waline instance
   */
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
  // oxlint-disable-next-line typescript/strict-boolean-expressions
  const root = el ? getRoot(el) : null;

  // check root
  // oxlint-disable-next-line typescript/strict-boolean-expressions
  if (el && !root) throw new Error(`Option 'el' do not match any domElement!`);

  // check serverURL
  if (!initProps.serverURL) throw new Error("Option 'serverURL' is missing!");

  const props = reactive({ ...initProps });
  const state = reactive({ comment, pageview, path });

  const updateCommentCount = (): void => {
    // oxlint-disable-next-line typescript/strict-boolean-expressions
    if (state.comment)
      commentCount({
        serverURL: props.serverURL,
        path: state.path,
        ...(isString(state.comment) ? { selector: state.comment } : {}),
      });
  };

  const updatePageviewCount = (): void => {
    // oxlint-disable-next-line typescript/strict-boolean-expressions
    if (state.pageview)
      pageviewCount({
        serverURL: props.serverURL,
        path: state.path,
        ...(isString(state.pageview) ? { selector: state.pageview } : {}),
      });
  };

  let app: App<Element> | null = null;

  if (root) {
    app = createApp(() => h(Waline, { path: state.path, ...props }));

    app.mount(root);
  }

  const stopComment = watchEffect(updateCommentCount);
  const stopPageview = watchEffect(updatePageviewCount);

  return {
    el: root,
    update: ({
      comment,
      pageview,
      path = window.location.pathname,
      ...newProps
    }: Partial<Omit<WalineInitOptions, 'el'>> = {}): void => {
      Object.entries(newProps).forEach(([key, value]) => {
        props[key] = value;
      });

      state.path = path;
      if (comment != null) state.comment = comment;
      if (pageview != null) state.pageview = pageview;
    },
    destroy: (): void => {
      app?.unmount();
      stopComment();
      stopPageview();
    },
  };
};

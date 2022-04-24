import type { WalineProps } from './waline';

export interface WalineInitOptions extends Omit<WalineProps, 'path'> {
  /**
   * Waline 的初始化挂载器。必须是一个**有效的** CSS 选择器 或 HTML 元素
   *
   * The DOM element to be mounted on initialization. It must be a **valid** CSS selector string or HTML Element.
   */
  el?: string | HTMLElement | null;

  /**
   * 评论数统计
   *
   * Comment number support
   *
   * @default false
   */
  comment?: string | boolean;

  /**
   * 页面访问量统计
   *
   * Pageview number support
   *
   * @default false
   */
  pageview?: string | boolean;

  /**
   * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
   *
   * 你可以将其设置为 `window.location.pathname`
   *
   * Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.
   *
   * You can set it to `window.location.pathname`
   *
   * @default window.location.pathname
   */
  path?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WalineAbort = (reason?: any) => void;

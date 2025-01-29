import type {
  WalineEmojiInfo,
  WalineEmojiPresets,
  WalineHighlighter,
  WalineImageUploader,
  WalineSearchOptions,
  WalineTeXRenderer,
} from './base.js';
import type { WalineProps } from './waline.js';

export interface WalineInitOptions
  extends Omit<
    WalineProps,
    | 'path'
    | 'emoji'
    | 'search'
    | 'highlighter'
    | 'imageUploader'
    | 'texRenderer'
  > {
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
   * @default true
   */
  comment?: string | boolean;

  /**
   * 页面访问量统计
   *
   * Pageview number support
   *
   * @default true
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

  /**
   * 设置表情包
   *
   * Set Emojis
   *
   * @default ['//unpkg.com/@waline/emojis@1.1.0/weibo']
   */
  emoji?: (WalineEmojiInfo | WalineEmojiPresets)[] | boolean;

  /**
   * 设置搜索功能
   *
   * Customize Search feature
   *
   * @default true
   */
  search?: WalineSearchOptions | boolean;

  /**
   * 代码高亮
   *
   * Code highlighting
   *
   * @default true
   */

  highlighter?: WalineHighlighter | boolean;

  /**
   * 自定义图片上传方法，方便更好的存储图片
   *
   * 方法执行时会将图片对象传入。
   *
   * Custom image upload callback to manage picture by yourself.
   *
   * We will pass a picture file object when execute it.
   *
   * @default true
   */

  imageUploader?: WalineImageUploader | boolean;

  /**
   * 自定义数学公式处理方法，用于预览。
   *
   * Custom math formula parse callback for preview.
   *
   * @default true
   */
  texRenderer?: WalineTeXRenderer | boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WalineAbort = (reason?: any) => void;

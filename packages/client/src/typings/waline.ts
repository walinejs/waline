import type {
  WalineHighlighter,
  WalineEmojiInfo,
  WalineImageUploader,
  WalineMeta,
  WalineTexRenderer,
} from './base';
import type { WalineLocale } from './locale';

export interface WalineProps {
  /**
   * Waline 的服务端地址
   *
   * Waline server address url
   */
  serverURL: string;

  /**
   * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
   *
   * 你可以将其设置为 `window.location.pathname`
   *
   * Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.
   *
   * You can set it to `window.location.pathname`
   */
  path: string;

  /**
   * 评论者相关属性
   *
   * `Meta` 可选值: `'nick'`, `'mail'`, `'link'`
   *
   * Reviewer attributes.
   *
   * Optional values for `Meta`: `'nick'`, `'mail'`, `'link'`
   *
   * @default ['nick', 'mail', 'link']
   */
  meta?: WalineMeta[];

  /**
   * 设置**必填项**，默认昵称为匿名
   *
   * Set required fields, default anonymous with nickname
   *
   * @default []
   */
  requiredMeta?: WalineMeta[];

  /**
   * 评论字数限制。填入单个数字时为最大字数限制
   *
   * @more 设置为 `0` 时无限制
   *
   * Comment word s limit. When a single number is filled in, it 's the maximum number of comment words.
   *
   * @more No limit when set to `0`.
   *
   * @default 0
   */
  wordLimit?: number | [number, number];

  /**
   * 评论列表分页，每页条数
   *
   * number of pages per page
   *
   * @default 10
   */
  pageSize?: number;

  /**
   * Waline 显示语言
   *
   * 可选值:
   *
   * - `'zh'`
   * - `'zh-cn'`
   * - `'zh-CN'`
   * - `'zh-tw'`
   * - `'zh-TW'`
   * - `'en'`
   * - `'en-US'`
   * - `'en-us'`
   * - `'jp'`
   * - `'jp-jp'`
   * - `'jp-JP'`
   * - `'pt-br'`
   * - `'pt-BR'`
   * - `'ru'`
   * - `'ru-ru'`
   * - `'ru-RU'`
   *
   * Display language for waline
   *
   * Optional value:
   *
   * - `'zh'`
   * - `'zh-cn'`
   * - `'zh-CN'`
   * - `'zh-tw'`
   * - `'zh-TW'`
   * - `'en'`
   * - `'en-US'`
   * - `'en-us'`
   * - `'jp'`
   * - `'jp-jp'`
   * - `'jp-JP'`
   * - `'pt-br'`
   * - `'pt-BR'`
   * - `'ru'`
   * - `'ru-ru'`
   * - `'ru-RU'`
   *
   * @default 'zh-CN'
   */
  lang?: string;

  /**
   * 自定义 waline 语言显示
   *
   * @see [自定义语言](https://waline.js.org/client/i18n.html)
   *
   * Custom display language in waline
   *
   * @see [I18n](https://waline.js.org/en/client/i18n.html)
   */
  locale?: Partial<WalineLocale>;

  /**
   * 是否启用暗黑模式适配
   *
   * @more 设置 `'auto'` 会根据设备暗黑模式自适应。填入 CSS 选择器会在对应选择器生效时启用夜间模式。
   *
   * Whether to enable darkmode support
   *
   * @more Setting `'auto'` will display darkmode due to device settings. Filling in CSS selector will enable darkmode only when the selector match waline ancestor nodes.
   */
  dark?: string | boolean;

  /**
   * 设置表情包
   *
   * Set Emojis
   *
   * @default ['//unpkg.com/@waline/emojis@1.0.1/weibo']
   */
  emoji?: (string | WalineEmojiInfo)[] | false;

  /**
   * 代码高亮
   *
   * Code highlighting
   */

  highlighter?: WalineHighlighter | false;

  /**
   * 自定义图片上传方法，方便更好的存储图片
   *
   * 方法执行时会将图片对象传入。
   *
   * Custom image upload callback to manage picture by yourself.
   *
   * We will pass a picture file object when execute it.
   */

  imageUploader?: WalineImageUploader | false;

  /**
   * 自定义数学公式处理方法，用于预览。
   *
   * Custom math formula parse callback for preview.
   */
  texRenderer?: WalineTexRenderer | false;

  /**
   *
   * 登录模式状态，可选值:
   *
   * - `'enable'`: 启用登录 (默认)
   * - `'disable'`: 禁用登录，用户只能填写信息评论
   * - `'force'`: 强制登录，用户必须注册并登录才可发布评论
   *
   * Login mode status, optional values:
   *
   * - `'enable'`: enable login (default)
   * - `'disable'`: Login is disabled, users should fill in infomation to comment
   * - `'force'`: Forced login, users must login to comment
   *
   * @default 'enable'
   */
  login?: 'enable' | 'disable' | 'force';

  /**
   * 是否在页脚展示版权信息
   *
   * 为了支持 Waline，我们强烈建议你开启它
   *
   * Whether show copyright in footer
   *
   * We strongly recommended you to keep it on to support waline
   *
   * @default true
   */
  copyright?: boolean;
}

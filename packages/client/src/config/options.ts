import type { Locale } from './i18n';

export type Avatar =
  | ''
  | 'mp'
  | 'identicon'
  | 'monsterid'
  | 'wavatar'
  | 'retro'
  | 'robohash'
  | 'hide';

export type EmojiMaps = Record<string, string>;

export type Meta = 'nick' | 'mail' | 'link';

export type UploadImage = (image: File) => Promise<string>;

export interface WalineOptions {
  /**
   * Waline 的初始化挂载器。必须是一个有效的 **CSS 选择器**
   *
   * The DOM element to be mounted on initialization. It must be a valid **CSS selector string**.
   *
   * @default '#waline'
   */
  el?: string;

  /**
   * Waline 的服务端地址
   *
   * Waline server address url
   */
  serverURL: string;

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
   * 当前 _文章页_ 路径，用于区分不同的 _文章页_ ，以保证正确读取该 _文章页_ 下的评论列表
   *
   * 可选值:
   *
   * - `window.location.pathname` (默认值，推荐)
   * - `window.location.href`
   * - 自定义
   *
   * > I. 请保证每个 _文章页_ 路径的唯一性，否则可能会出现不同 _文章页_ 下加载相同评论列表的情况。
   * >
   * > II. 如果值为 `window.location.href`，可能会出现随便加 _不同参数_ 进入该页面，而被判断成新页面的情况。
   *
   * Article path id. Used to distinguish different _article pages_ to ensure loading the correct comment list under the _article page_.
   *
   * Optional value:
   *
   * - `window.location.pathname` (default, recommended)
   * - `window.location.href`
   * - customize
   *
   * > I. Please ensure the uniqueness of each _article page_ path, otherwise the same comment list may be loaded under different _article pages_.
   * >
   * > II. If the value is `window.location.href`, it may appear that adding _different parameters_ to enter the page, and it will be judged as a new page.
   *
   * @default window.location.pathname
   */
  path?: string;

  /**
   * [Gravatar](http://cn.gravatar.com/) 头像展示方式
   *
   * 可选值:
   *
   * - `''`
   * - `'mp'`
   * - `'identicon'`
   * - `'monsterid'`
   * - `'wavatar'`
   * - `'retro'`
   * - `'robohash'`
   * - `'hide'`
   *
   * @see https://waline.js.org/client/avatar.html
   *
   * [Gravatar](http://gravatar.com/) type
   *
   * Optional value:
   *
   * - `''`
   * - `'mp'`
   * - `'identicon'`
   * - `'monsterid'`
   * - `'wavatar'`
   * - `'retro'`
   * - `'robohash'`
   * - `'hide'`
   *
   * @see https://waline.js.org/en/client/avatar.html
   *
   * @default 'mp'
   */
  avatar?: Avatar;

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
  meta?: Meta[];

  /**
   * 设置**必填项**，默认昵称为匿名
   *
   * Set required fields, default anonymous with nickname
   *
   * @default []
   */
  requiredMeta?: Meta[];

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
   * - `'zh-CN'`
   * - `'zh-TW'`
   * - `'en'`
   * - `'en-US'`
   * - `'jp'`
   * - `'jp-JP'`
   *
   * Display language for waline
   *
   * Optional value:
   *
   * - `'zh'`
   * - `'zh-CN'`
   * - `'zh-TW'`
   * - `'en'`
   * - `'en-US'`
   * - `'jp'`
   * - `'jp-JP'`
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
  locale?: Partial<Locale>;

  /**
   * 文章访问量统计
   *
   * Article reading statistics
   *
   * @default false
   */
  visitor?: boolean;

  /**
   * 是否启用暗黑模式适配
   *
   * @more 设置 `'auto'` 会根据设备暗黑模式自适应。填入 CSS 选择器会在对应选择器生效时启用夜间模式。
   *
   * Whether to enable darkmode support
   *
   * @more Setting `'auto'` will display darkmode due to device settings. Filling in CSS selector will enable darkmode only when the selector match waline ancestor nodes.
   */
  dark?: string;

  /**
   * 代码高亮
   *
   * Code highlighting
   *
   * @default true
   */

  highlight?: boolean;

  /**
   * 设置 Gravatar 头像 CDN 地址
   *
   * Gravatar CDN baseURL
   *
   * @default 'https://cdn.v2ex.com/gravatar/'
   */
  avatarCDN?: string;

  /**
   * 每次访问是否**强制**拉取最新的*评论列表头像*
   *
   * Whether **force** pulling the latest avatar each time
   *
   * @default false
   */
  avatarForce?: boolean;

  /**
   * 设置表情包
   *
   * Set Emojis
   *
   * @default ['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo']
   */
  emojis?: string[];

  /**
   * 自定义图片上传方法，方便更好的存储图片
   *
   * 方法执行时会将图片对象传入。
   *
   * Custom image upload callback to manage picture by yourself.
   *
   * We will pass a picture file object when execute it.
   */

  uploadImage?: UploadImage;

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
   * @deprecated Use `login` instead, will be dropped in future versions of V1
   *
   * 是否允许登录评论
   *
   * 默认情况是两者都支持，设置为 `true` 表示仅支持匿名评论，`false` 表示仅支持登录评论。
   *
   * Whether to allow login comments.
   *
   * Both supported by default, set to `true` means only support anonymous comments, `false` means only support login comments.
   *
   * @default undefined
   */
  anonymous?: boolean;

  /**
   * 是否在页脚展示版权信息
   *
   * 为了支持 Waline，我们强烈建议你开启它
   *
   * Whether show copyright in fotter
   *
   * We strongly recommended you to keep it on to support waline
   *
   * @default true
   */
  copyright?: boolean;

  /**
   * @deprecated Use `locale.placeholder` instead, will be dropped in future versions of V1
   */
  placeholder?: string;

  /**
   * @deprecated Use `locale` instead, will be dropped in future versions of V1
   */
  langMode?: Locale;

  /**
   * @deprecated Use `requiredMeta` instead, will be dropped in future versions of V1
   */
  requiredFields?: Meta[];

  /**
   * @deprecated Use `emojis` instead, will be dropped in future versions of V1
   *
   * 设置**表情包 CDN**
   *
   * @see [自定义表情包](https://waline.js.org/client/emoji.html)
   *
   * Set **Emoji Pack CDN**
   *
   * @see [Custom Emoji](https://waline.js.org/en/client/emoji.html)
   *
   * @default 'https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/'
   */
  emojiCDN?: string;

  /**
   * @deprecated Use `emojis` instead, will be dropped in future versions of V1
   *
   * 设置**表情包映射**
   *
   * @see [自定义表情](https://waline.js.org/client/emoji.html)
   *
   * Set **emoji maps**
   *
   * @see [Custom Emoji](https://waline.js.org/en/client/emoji.html)
   *
   * @default 微博表情包
   */

  emojiMaps?: EmojiMaps;
}

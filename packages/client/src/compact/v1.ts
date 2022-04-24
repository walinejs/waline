import type {
  WalineHighlighter,
  WalineImageUploader,
  WalineTexRenderer,
} from '../typings';

export interface DeprecatedWalineOptions {
  /**
   * @deprecated Please use mathjax in server, dropped in V2
   *
   * 是否注入额外的样式添加对 `<math>` 块的兼容
   *
   * Whether injecting additional styles to support math block
   *
   * @default false
   */
  mathTagSupport?: boolean;

  /**
   * @deprecated use `pageview` instead, dropped in V2
   *
   * 文章访问量统计
   *
   * Article reading statistics
   *
   * @default false
   */
  visitor?: boolean;

  /**
   * @deprecated use `highlighter` instead, dropped in V2
   *
   * 代码高亮
   *
   * Code highlighting
   */

  highlight?: WalineHighlighter | false;

  /**
   * @deprecated use `imageUploader` instead, dropped in V2
   *
   * 自定义图片上传方法，方便更好的存储图片
   *
   * 方法执行时会将图片对象传入。
   *
   * Custom image upload callback to manage picture by yourself.
   *
   * We will pass a picture file object when execute it.
   */

  uploadImage?: WalineImageUploader | false;

  /**
   * @deprecated Use `login` instead, dropped in V2
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
   * @deprecated Please use `AVATAR_PROXY` in server, dropped in V2
   *
   * 设置 Gravatar 头像 CDN 地址
   *
   * Gravatar CDN baseURL
   *
   * @default 'https://www.gravatar.com/avatar'
   */
  avatarCDN?: string;

  /**
   * @deprecated Use `texRenderer` instead, dropped in V2
   *
   * 自定义 Tex 处理方法，用于预览。
   *
   * Custom math formula parse callback for preview.
   */
  previewMath?: WalineTexRenderer | false;

  /**
   * @deprecated use `copyright` instead, dropped in V2
   *
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
  copyRight?: boolean;
}

export interface WalineEmojiInfo {
  /**
   * 选项卡上的 Emoji 名称
   *
   * Emoji name show on tab
   */
  name: string;
  /**
   * 所在文件夹链接
   *
   * Current folder link
   */
  folder?: string;
  /**
   * Emoji 通用路径前缀
   *
   * Common prefix of Emoji icons
   */
  prefix?: string;
  /**
   * Emoji 图片的类型，会作为文件扩展名使用
   *
   * Type of Emoji icons, will be regarded as file extension
   */
  type?: string;
  /**
   * 选项卡显示的 Emoji 图标
   *
   * Emoji icon show on tab
   */
  icon: string;
  /**
   * Emoji 图片列表
   *
   * Emoji image list
   */
  items: string[];
}

export type WalineEmojiMaps = Record<string, string>;

export type WalineMeta = 'nick' | 'mail' | 'link';

export type WalineImageUploader = (image: File) => Promise<string>;

export type WalineHighlighter = (code: string, lang: string) => string;

export type WalineTexRenderer = (blockMode: boolean, tex: string) => string;

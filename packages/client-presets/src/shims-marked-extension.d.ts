declare module 'marked-emoji' {
  import { type marked } from 'marked';

  export interface MarkedEmojiOptions {
    emojis: Record<string, string>;
    /**
     * @default false
     */
    unicode?: boolean;
  }

  export const markedEmoji: (
    options: MarkedEmojiOptions
  ) => marked.MarkedExtension;
}

declare module 'marked-highlight' {
  import { type marked } from 'marked';

  export interface MarkedHighlightOptions {
    langPrefix?: string;
    highlight?: (code: string, lang: string) => string;
  }

  export const markedHighlight: (
    options: MarkedHighlightOptions
  ) => marked.MarkedExtension;
}

declare module '@markdown/main' {
  import { type MarkdownRenderer } from './typings.js';

  export const getRenderer: () => Promise<MarkdownRenderer>;
}

declare module '@markdown/emoji' {
  import { type EmojiMap } from './typings.js';

  export const setEmojiParser: (emojiMap: EmojiMap) => void;
}

declare module '@markdown/tex' {
  export {};
}

declare module '@tex' {
  import { type TexRenderer } from './typings.js';

  export const texRenderer: TexRenderer;
}

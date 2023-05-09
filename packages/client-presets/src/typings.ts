export type CaptchaValidator<T = string> = (token: string) => Promise<T>;

export type EmojiMap = Record<string, string>;

export type Highlighter = (code: string, lang: string) => string;

export type MarkdownRenderer = (markdown: string) => string;

export type TexRenderer = (tex: string, displayMode: boolean) => string;

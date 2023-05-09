import path from 'node:path';
import { fileURLToPath } from 'node:url';

import aliasPlugin from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import jsonPlugin from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { type RollupOptions } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const markdownItMainPath = path.resolve(
  __dirname,
  './src/markdown/markdown-it/markdown-it.ts'
);
const markdownItEmojiPath = path.resolve(
  __dirname,
  './src/markdown/markdown-it/emoji.ts'
);
const markdownItTexPath = path.resolve(
  __dirname,
  './src/markdown/markdown-it/tex.ts'
);

const markedMainPath = path.resolve(
  __dirname,
  './src/markdown/marked/marked.ts'
);
const markedEmojiPath = path.resolve(
  __dirname,
  './src/markdown/marked/emoji.ts'
);
const markedTexPath = path.resolve(__dirname, './src/markdown/marked/tex.ts');

const katexPath = path.resolve(__dirname, './src/tex/katex.ts');
const mathjaxPath = path.resolve(__dirname, './src/tex/mathjax.ts');

interface JSOptions {
  input: string;
  output: string;
  alias?: Record<string, string> | null;
  json?: boolean;
}

export const getJs = ({
  input,
  output,
  alias = null,
  json = false,
}: JSOptions): RollupOptions => ({
  input: `./src/${input}`,
  output: [
    {
      file: `./dist/${output}.cjs`,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: `./dist/${output}.mjs`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    alias ? aliasPlugin({ entries: alias }) : null,
    json ? jsonPlugin() : null,
    esbuild({
      charset: 'utf8',
      target: ['chrome79', 'firefox79', 'edge79', 'safari13', 'node16'],
      minify: true,
    }),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
  ],
});

interface DtsOptions {
  input: string;
  output: string;
  alias?: Record<string, string> | null;
}

export const getDts = ({
  input,
  output,
  alias = null,
}: DtsOptions): RollupOptions => ({
  input: `./src/${input}`,
  output: [
    { file: `./dist/${output}.d.cts`, format: 'esm' },
    { file: `./dist/${output}.d.mts`, format: 'esm' },
  ],
  plugins: [
    alias ? aliasPlugin({ entries: alias }) : null,
    dts({ compilerOptions: { preserveSymlinks: false } }),
  ],
});

const captcha = [
  getJs({
    input: 'captcha/recaptcha-v3.ts',
    output: 'recaptcha-v3',
  }),

  getDts({
    input: 'captcha/recaptcha-v3.ts',
    output: 'turnstile',
  }),

  getJs({
    input: 'captcha/turnstile.ts',
    output: 'recaptcha-v3',
  }),

  getDts({
    input: 'captcha/turnstile.ts',
    output: 'turnstile',
  }),
];

const markdownSlim = [
  getJs({
    input: 'markdown/slim.ts',
    output: 'markdown-it-slim',
    alias: {
      '@markdown/main': markdownItMainPath,
    },
    json: true,
  }),

  getDts({
    input: 'markdown/slim.ts',
    output: 'markdown-it-slim',
    alias: {
      '@markdown/main': markdownItMainPath,
    },
  }),

  getJs({
    input: 'markdown/slim.ts',
    output: 'marked-slim',
    alias: {
      '@markdown/main': markedMainPath,
    },
  }),

  getDts({
    input: 'markdown/slim.ts',
    output: 'marked-slim',
    alias: {
      '@markdown/main': markedMainPath,
    },
  }),
];

const markdownEmoji = [
  getJs({
    input: 'markdown/emoji.ts',
    output: 'markdown-it-emoji',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/emoji': markdownItEmojiPath,
    },
    json: true,
  }),

  getDts({
    input: 'markdown/emoji.ts',
    output: 'markdown-it-emoji',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/emoji': markdownItEmojiPath,
    },
  }),

  getJs({
    input: 'markdown/emoji.ts',
    output: 'marked-emoji',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/emoji': markedEmojiPath,
    },
  }),

  getDts({
    input: 'markdown/emoji.ts',
    output: 'marked-emoji',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/emoji': markedEmojiPath,
    },
  }),
];

const markdownTex = [
  getJs({
    input: 'markdown/tex.ts',
    output: 'markdown-it-katex',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/tex': markdownItTexPath,
      '@tex': katexPath,
    },
    json: true,
  }),

  getDts({
    input: 'markdown/tex.ts',
    output: 'markdown-it-slim',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/tex': markdownItTexPath,
      '@tex': katexPath,
    },
  }),

  getJs({
    input: 'markdown/tex.ts',
    output: 'marked-katex',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/tex': markedTexPath,
      '@tex': katexPath,
    },
  }),

  getDts({
    input: 'markdown/tex.ts',
    output: 'marked-katex',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/tex': markedTexPath,
      '@tex': katexPath,
    },
  }),

  getJs({
    input: 'markdown/tex.ts',
    output: 'markdown-it-mathjax',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/tex': markdownItTexPath,
      '@tex': mathjaxPath,
    },
    json: true,
  }),

  getDts({
    input: 'markdown/tex.ts',
    output: 'markdown-it-mathjax',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/tex': markdownItTexPath,
      '@tex': mathjaxPath,
    },
  }),

  getJs({
    input: 'markdown/tex.ts',
    output: 'marked-mathjax',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/tex': markedTexPath,
      '@tex': mathjaxPath,
    },
  }),

  getDts({
    input: 'markdown/tex.ts',
    output: 'marked-mathjax',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/tex': markedTexPath,
      '@tex': mathjaxPath,
    },
  }),
];

const markdownEmojiTex = [
  getJs({
    input: 'markdown/emoji-tex.ts',
    output: 'markdown-it-emoji-katex',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/emoji': markdownItEmojiPath,
      '@markdown/tex': markdownItTexPath,
      '@tex': katexPath,
    },
    json: true,
  }),

  getDts({
    input: 'markdown/emoji-tex.ts',
    output: 'markdown-it-emoji-katex',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/emoji': markdownItEmojiPath,
      '@markdown/tex': markdownItTexPath,
      '@tex': katexPath,
    },
  }),

  getJs({
    input: 'markdown/emoji-tex.ts',
    output: 'marked-emoji-katex',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/emoji': markedEmojiPath,
      '@markdown/tex': markedTexPath,
      '@tex': katexPath,
    },
  }),

  getDts({
    input: 'markdown/emoji-tex.ts',
    output: 'marked-emoji-katex',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/emoji': markedEmojiPath,
      '@markdown/tex': markedTexPath,
      '@tex': katexPath,
    },
  }),

  getJs({
    input: 'markdown/emoji-tex.ts',
    output: 'markdown-it-emoji-mathjax',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/emoji': markdownItEmojiPath,
      '@markdown/tex': markdownItTexPath,
      '@tex': mathjaxPath,
    },
    json: true,
  }),

  getDts({
    input: 'markdown/emoji-tex.ts',
    output: 'markdown-it-emoji-mathjax',
    alias: {
      '@markdown/main': markdownItMainPath,
      '@markdown/emoji': markdownItEmojiPath,
      '@markdown/tex': markdownItTexPath,
      '@tex': mathjaxPath,
    },
  }),

  getJs({
    input: 'markdown/emoji-tex.ts',
    output: 'marked-emoji-mathjax',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/emoji': markedEmojiPath,
      '@markdown/tex': markedTexPath,
      '@tex': mathjaxPath,
    },
  }),

  getDts({
    input: 'markdown/emoji-tex.ts',
    output: 'marked-emoji-mathjax',
    alias: {
      '@markdown/main': markedMainPath,
      '@markdown/emoji': markedEmojiPath,
      '@markdown/tex': markedTexPath,
      '@tex': mathjaxPath,
    },
  }),
];

export default [
  ...captcha,
  ...markdownSlim,
  ...markdownEmoji,
  ...markdownTex,
  ...markdownEmojiTex,
];

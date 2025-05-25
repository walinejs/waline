/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  DefineComponent,
  PublicProps,
} from 'vue';

import type { WalineProps } from '../typings/index.js';

export const Waline: DefineComponent<
  WalineProps,
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<WalineProps> & Readonly<{}>,
  {},
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  {},
  HTMLDivElement
>;
export const version: string;

export interface WalineDateLocale {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  now: string;
}

export type WalineLevelLocale = Record<`level${number}`, string>;

export interface WalineReactionLocale {
  reactionTitle: string;
  reaction0: string;
  reaction1: string;
  reaction2: string;
  reaction3: string;
  reaction4: string;
  reaction5: string;
  reaction6: string;
  reaction7: string;
  reaction8: string;
}

export interface WalineLocale
  extends WalineDateLocale,
    WalineLevelLocale,
    WalineReactionLocale {
  nick: string;
  mail: string;
  link: string;
  optional: string;
  placeholder: string;
  sofa: string;
  submit: string;
  comment: string;
  refresh: string;
  more: string;
  uploading: string;
  login: string;
  admin: string;
  sticky: string;
  word: string;
  anonymous: string;
  gif: string;
  gifSearchPlaceholder: string;

  // manage
  approved: string;
  waiting: string;
  spam: string;
  unsticky: string;

  // sorting
  oldest: string;
  latest: string;
  hottest: string;

  // hint
  nickError: string;
  mailError: string;
  wordHint: string;

  // i18n
  like: string;
  cancelLike: string;
  reply: string;
  cancelReply: string;
  preview: string;
  emoji: string;
  uploadImage: string;
  profile: string;
  logout: string;
}

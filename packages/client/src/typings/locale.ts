export interface WalineDateLocale {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  now: string;
}

export type WalineLevelLocale = Record<`level${number}`, string>;

export interface WalineLocale extends WalineDateLocale, WalineLevelLocale {
  nick: string;
  nickError: string;
  mail: string;
  mailError: string;
  link: string;
  optional: string;
  placeholder: string;
  sofa: string;
  submit: string;
  like: string;
  cancelLike: string;
  reply: string;
  cancelReply: string;
  comment: string;
  refresh: string;
  more: string;
  preview: string;
  emoji: string;
  uploadImage: string;
  uploading: string;
  login: string;
  logout: string;
  admin: string;
  sticky: string;
  word: string;
  wordHint: string;
  anonymous: string;
  gif: string;
  gifSearchPlaceholder: string;
  profile: string;
  approved: string;
  waiting: string;
  spam: string;
  unsticky: string;
  oldest: string;
  latest: string;
  hottest: string;
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

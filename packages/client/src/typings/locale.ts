export interface WalineDateLocale {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  now: string;
}

export interface WalineLevelLocale {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
}

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
}

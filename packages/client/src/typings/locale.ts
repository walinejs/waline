export interface WalineDateLocale {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  now: string;
}

export interface WalineLocale extends WalineDateLocale {
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

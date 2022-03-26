declare module 'hanabi' {
  const hanabi: (
    code: string,
    lang: string,
    callback?: (error: unknown, code?: string | undefined) => void
  ) => string | void;

  export default hanabi;
}

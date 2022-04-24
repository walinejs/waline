export const warning = (content: string): void =>
  console.warn(
    `%c ${content}`,
    'background:#ff0;color:red;font-size:36px;font-weight:bold;'
  );

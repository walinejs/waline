/**
 * @ref https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
 */
const EMAIL_REG_EXP =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isValidEmail = (email: string): boolean =>
  EMAIL_REG_EXP.test(email);

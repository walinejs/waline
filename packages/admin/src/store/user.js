import {
  forgot,
  getUserInfo,
  login,
  logout,
  register,
} from '../services/auth.js';
import { updateProfile } from '../services/user.js';

export const user = {
  state: null,
  reducers: {
    setUser(_, user) {
      return user;
    },
    updateUser(state, data) {
      return { ...state, ...data };
    },
  },
  effects: (dispatch) => ({
    async loadUserInfo() {
      const user = await getUserInfo();

      if (!user?.email) {
        return;
      }
      if (window.opener) {
        const localToken = localStorage.getItem('TOKEN');
        const remember = !!localToken;
        const token =
          localToken || window.TOKEN || sessionStorage.getItem('token');

        window.opener.postMessage(
          { type: 'userInfo', data: { token, remember, ...user } },
          '*',
        );
      }

      return dispatch.user.setUser(user);
    },
    async login({ email, password, code, remember, recaptchaV3, turnstile }) {
      const { token, ...user } = await login({
        email,
        password,
        code,
        recaptchaV3,
        turnstile,
      });

      if (token) {
        window.TOKEN = token;
        sessionStorage.setItem('TOKEN', token);
        if (remember) {
          localStorage.setItem('TOKEN', token);
        }
        if (window.opener) {
          window.opener.postMessage(
            { type: 'userInfo', data: { token, remember, ...user } },
            '*',
          );
        }
      }

      return dispatch.user.setUser(user);
    },
    logout() {
      logout();
      dispatch.user.setUser(null);
    },
    register(user) {
      return register(user);
    },
    forgot(user) {
      return forgot(user);
    },
    async updateProfile(data) {
      await updateProfile(data);

      if (window.opener) {
        window.opener.postMessage({ type: 'profile', data }, '*');
      }

      return dispatch.user.updateUser(data);
    },
  }),
};

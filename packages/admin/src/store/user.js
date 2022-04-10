import { getUserInfo, login, logout, register, forgot } from '../services/auth';
import { updateProfile } from '../services/user';

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
      if (!user) {
        return;
      }
      if (window.opener) {
        const localToken = localStorage.getItem('TOKEN');
        const remember = !!localToken;
        const token =
          localToken || window.TOKEN || sessionStorage.getItem('token');
        window.opener.postMessage(
          { type: 'userInfo', data: { token, remember, ...user } },
          '*'
        );
      }
      return dispatch.user.setUser(user);
    },
    async login({ email, password, code, remember }) {
      const { token, ...user } = await login({ email, password, code });
      if (token) {
        window.TOKEN = token;
        sessionStorage.setItem('TOKEN', token);
        if (remember) {
          localStorage.setItem('TOKEN', token);
        }
        if (window.opener) {
          window.opener.postMessage(
            { type: 'userInfo', data: { token, remember, ...user } },
            '*'
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

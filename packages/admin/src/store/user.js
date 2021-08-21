import { getUserInfo, login, logout, register } from '../services/auth';
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
        let token = window.TOKEN || sessionStorage.getItem('TOKEN');
        if (!token) {
          token = localStorage.getItem('TOKEN');
        }
        window.opener.postMessage(
          { type: 'userInfo', data: { token, ...user } },
          '*'
        );
      }
      return dispatch.user.setUser(user);
    },
    async login({ email, password, remember }) {
      const { token, ...user } = await login({ email, password });
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
    async updateProfile(data) {
      await updateProfile(data);

      if (window.opener) {
        window.opener.postMessage({ type: 'profile', data }, '*');
      }
      return dispatch.user.updateUser(data);
    },
  }),
};

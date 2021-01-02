import { createModel } from '@rematch/core';
import { getUserInfo, login, logout, register } from '../services/auth';

export const user = createModel({
  state: null,
  reducers: {
    setUser(_, user) {
      return user;
    },
  },
  effects: dispatch => ({
    async loadUserInfo() {
      const user = await getUserInfo();
      if(!user) {
        return;
      }
      if(window.opener) {
        let token = globalThis.TOKEN || sessionStorage.getItem('TOKEN');
        if(!token) {
          token = localStorage.getItem('TOKEN');
        }
        window.opener.postMessage({type: 'userInfo', data: {token, ...user}}, '*');
      }
      return dispatch.user.setUser(user);
    },
    async login({email, password, remember}) {
      const {token, ...user} = await login({email, password});
      if(token) {
        globalThis.TOKEN = token;
        sessionStorage.setItem('TOKEN', token);
        if(remember) {
          localStorage.setItem('TOKEN', token);
        }
        if(window.opener) {
          window.opener.postMessage({type: 'userInfo', data: {token, remember, ...user}}, '*');
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
    }
  }),
})

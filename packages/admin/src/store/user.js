import { createModel } from '@rematch/core'
import { getUserInfo, login, logout } from '../services/auth'

export const user = createModel({
  state: null,
  reducers: {
    setUser(_, user) {
      return user
    },
  },
  effects: dispatch => ({
    async loadUserInfo() {
      const user = await getUserInfo()
      return dispatch.user.setUser(user)
    },
    async login({email, password, remember}) {
      const {token, ...user} = await login({email, password});
      if(token) {
        globalThis.TOKEN = token;
        if(remember) {
          localStorage.setItem('TOKEN', token);
        }
      }
      return dispatch.user.setUser(user);
    },
    logout() {
      logout();
      dispatch.user.setUser(null);
    }
  }),
})

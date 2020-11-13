import { createModel } from '@rematch/core'
import { getUserInfo } from '../services/auth'

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
  }),
})

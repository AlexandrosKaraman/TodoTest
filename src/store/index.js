import {createStore} from 'vuex'

import usersModule from "@/store/users"
import tasksModule from "@/store/tasks"

export default createStore({
  modules: {
    users: usersModule,
    tasks: tasksModule
  },
  state: {
    userId: null,
  },
  getters: {
    getUserId: ({userId}) => userId
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = Number(userId)
    }
  }
})

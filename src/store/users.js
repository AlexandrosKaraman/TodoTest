export default {
  state: {
    users: [],
  },
  getters: {
    getAll: ({ users }) => users,
    getUsersForSelect: ({ users }) => {
      const _users = users.map(user => ({
        id: user.id,
        name: `id: ${user.id}, ${user.name}`,
      }))
      return [
        {
          id: -1,
          name: 'all',
        },
        ..._users,
      ]
    },
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = Number(userId)
    },
    SET_USERS(state, users) {
      state.users = users
    },
  },
  actions: {
    fetchUsers({ commit }) {
      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          commit('SET_USERS', users)
        })
        .catch(error => {
          commit('SET_MESSAGE_TEXT', error)
          commit('SET_MESSAGE_TYPE', 'error')
        })
    },
  },
}

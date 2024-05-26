export default {
  state: {
    tasks: [],
    userId: 1
  },
  getters: {
    getTasks: ({tasks}) => tasks
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    SET_USER_ID(state, userId) {
      state.userId = Number(userId)
    }
  },
  actions: {
    fetchTasks({commit, state}) {
      return fetch(`https://jsonplaceholder.typicode.com/${state.userId === -1 ? 'todos' : `users/${state.userId}/todos`}`)
        .then((response) => response.json())
        .then((tasks) => {
          commit('SET_TASKS', tasks)
        })
        .catch((error) => {
          commit('SET_MESSAGE_TEXT', error)
          commit('SET_MESSAGE_TYPE', 'error')
        })
    },
    addTask({commit, state}, {title, userId}) {
      fetch('https://jsonplaceholder.typicode.com/todos/', {
        method: 'POST',
        body: JSON.stringify({
          body: 'bar',
          title,
          userId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((task) => {

          commit('SET_TASKS', [...state.tasks, task])
        })
    }
  }
}

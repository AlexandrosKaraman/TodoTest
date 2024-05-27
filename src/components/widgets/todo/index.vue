<template lang="pug">
  .filters
    .filters__titles
      todo-logout.logout
    .filters__selects
      ui-select-list(
        v-model="selectedFilter"
        :options="filters"
        placeholder="Select todo list filter"
      )
      ui-select-list(
        v-model="selectedUser"
        :options="usersOptions"
        placeholder="Select user"
      )
    .filters__search
      ui-input(placeholder='Search...' v-model="searchTitle")
    .filters__input-add
      ui-input(placeholder="user-id" v-model="form.userId")
      ui-input(placeholder="title" v-model="form.title")
      ui-button(name="add" @click="addTask")
    template(v-if='filteredTasks().length' )
      my-todos(:user="filteredTasks()")
    template(v-else)
      h1 No Data!
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'

import MyTodos from '@/components/features/todo/todos.vue'
import TodoTitle from '@/components/features/todo/title.vue'
import UiSelectList from '@/components/ui/select/index.vue'
import TodoLogout from '@/components/features/todo/logout.vue'
import UiInput from '@/components/ui/input/index.vue'
import UiButton from '@/components/ui/button/index.vue'

export default {
  name: 'WidgetsTodo',
  components: {
    UiButton,
    UiInput,
    TodoLogout,
    TodoTitle,
    MyTodos,
    UiSelectList,
  },
  props: {
    userId: {
      type: Number,
      required: true,
      default: null,
    },
  },
  setup() {
    const store = useStore()

    const filters = ref([
      { id: 1, name: 'All' },
      { id: 2, name: 'Completed' },
      { id: 3, name: 'Uncompleted' },
      { id: 4, name: 'Favorites' },
    ])
    const selectedFilter = ref({ id: 1, name: 'All' })
    const selectedUser = ref(null)
    const searchTitle = ref('')

    const form = reactive({
      userId: null,
      title: null,
    })

    const usersOptions = computed(() => store.getters.getUsersForSelect)
    const tasks = computed(() => store.getters.getTasks)
    const userId = computed(() => store.getters.getUserId)

    const addTask = () => {
      store.dispatch('addTask', form)
    }
    const filteredTasks = () => {
      let _tasks = tasks.value
      switch (selectedFilter.value.id) {
        case 2:
          _tasks = _tasks.filter(({ completed }) => completed === true)
          break
        case 3:
          _tasks = _tasks.filter(({ completed }) => completed === false)
          break
        case 4:
          _tasks = _tasks.filter(task => {
            const favorite = JSON.parse(localStorage.getItem('favoriteList'))
            if (favorite !== null) {
              let isFavorite = false
              for (let i = 0, l = favorite.length; i < l; i += 1) {
                if (favorite[i] === task.id) {
                  isFavorite = true
                }
              }
              return isFavorite
            }
          })
          break
      }
      if (searchTitle.value) {
        _tasks = _tasks.filter(task =>
          task.title.toLowerCase().includes(searchTitle.value.toLowerCase()),
        )
      }
      return _tasks.length > 0 ? _tasks : []
    }
    const setFirstValueSelectedUser = () => {
      const userIdFromLS = Number(localStorage.getItem('userId'))
      if (userId.value || userIdFromLS) {
        const find = usersOptions.value.find(
          option => option.id === userId.value || option.id === userIdFromLS,
        )
        if (find) selectedUser.value = find
      }
    }

    watch(
      selectedFilter,
      () => {
        filteredTasks()
      },
      { deep: true },
    )
    watch(selectedUser, () => {
      store.commit('SET_USER_ID', selectedUser.value.id)
      store.dispatch('fetchTasks')
    })
    watch(usersOptions, (n, o) => {
      if (o && o.length === 1) setFirstValueSelectedUser()
    })
    watch(searchTitle, () => {
      filteredTasks.value
    })

    onMounted(() => {
      setFirstValueSelectedUser()
    })

    return {
      form,
      filters,
      selectedFilter,
      filteredTasks,
      addTask,
      selectedUser,
      usersOptions,
      searchTitle,
    }
  },
}
</script>

<style lang="sass" scoped>
.filters
  display: grid
  grid-template-rows: 85px 70px
  width: 100%
  max-width: 900px

  h1
    height: 300px
    text-align: center
    color: var(--white-color)

  &__titles
    display: flex
    align-items: center
    justify-self: flex-end

  &__selects
    width: 100%
    display: flex
    gap: 10px

  &__search
    max-height: 41px
    margin-bottom: 20px

  &__input-add
    display: grid
    grid-template-columns: 40% 40% 18%
    justify-content: space-between
    grid-gap: 10px
    margin-bottom: 20px

  @media screen and (max-width: 768px)
    grid-template-rows: 1fr

    h1
      font-size: 24px

    &__input-add
      display: flex
      flex-direction: column

    &__selects
      flex-direction: column
      margin: 15px 0 20px 0

    &__titles
      .logout
      display: none
</style>

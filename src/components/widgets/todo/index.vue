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
    .filters__input-add
      ui-input(placeholder="user-id" v-model="form.userId")
      ui-input(placeholder="title" v-model="form.title")
      ui-button(name="add" @click="addTask")
    my-todos(:user="filteredTasks()")
</template>

<script>
import MyTodos from "@/components/features/todo/todos.vue"
import TodoTitle from "@/components/features/todo/title.vue"
import UiSelectList from '@/components/ui/select/index.vue'
import TodoLogout from '@/components/features/todo/logout.vue'
import UiInput from "@/components/ui/input/index.vue"
import UiButton from "@/components/ui/button/index.vue"

import {computed, onMounted, reactive, ref, watch} from "vue"
import {useStore} from "vuex"

export default {
  name: 'WidgetsTodo',
  components: {
    UiButton,
    UiInput,
    TodoLogout,
    TodoTitle,
    MyTodos,
    UiSelectList
  },
  props: {
    userId: {
      type: Number,
      required: true,
      default: null
    }
  },
  setup() {
    const store = useStore()
    const filters = ref([
      {id: 1, name: 'All'},
      {id: 2, name: 'Completed'},
      {id: 3, name: 'Uncompleted'},
      {id: 4, name: 'Favorites'}
    ])
    const form = reactive({
      userId: null,
      title: null
    })
    const usersOptions = computed(() => store.getters.getUsersForSelect)
    const addTask = () => {
      store.dispatch('addTask', form)
    }
    const selectedFilter = ref({id: 1, name: 'All'})
    const selectedUser = ref(null)
    const tasks = computed(() => store.getters.getTasks)
    const userId = computed(() => store.getters.getUserId)
    const filteredTasks = () => {
      let _tasks = tasks.value
      switch (selectedFilter.value.id) {
        case 2:
          _tasks = _tasks.filter(({completed}) => completed === true)
          break
        case 3:
          _tasks = _tasks.filter(({completed}) => completed === false)
          break
        case 4:
          _tasks = _tasks.filter((task) => {
            const favorite = JSON.parse(localStorage.getItem('favoriteList'))
            let isFavorite = false
            for (let i = 0, l = favorite.length; i < l; i += 1) {
              if (favorite[i] === task.id) {
                isFavorite = true
              }
            }
            return isFavorite
          })
          break
      }
      return _tasks.length > 0 ? _tasks : []
    }
    const setFirstValueSelectedUser = () => {
      const userIdFromLS = Number(localStorage.getItem('userId'))
      if (userId.value || userIdFromLS) {
        const find = usersOptions.value.find(option => option.id === userId.value || option.id === userIdFromLS)
        if (find) selectedUser.value = find
      }
    }
    watch(selectedFilter, () => {
      filteredTasks()
    }, {deep: true})
    watch(selectedUser, () => {
      store.commit("SET_USER_ID", selectedUser.value.id)
      store.dispatch('fetchTasks')
    })
    watch(usersOptions, (n, o) => {
      if(o && o.length === 1) setFirstValueSelectedUser()
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
      usersOptions
    }
  }
}
</script>

<style lang="sass" scoped>
.filters
  display: grid
  grid-template-rows: 85px 70px
  width: 100%
  max-width: 900px
  &__titles
    display: flex
    align-items: center
    justify-self: flex-end
  &__selects
    width: 100%
    display: flex
    gap: 10px
  &__input-add
    display: grid
    grid-template-columns: 40% 40% 18%
    justify-content: space-between
    grid-gap: 10px
    margin-bottom: 20px
</style>


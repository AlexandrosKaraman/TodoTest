<template lang="pug">
  .about
    widgets-user-details
    widgets-todo(:user-id="userId")
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"

import widgetsUserDetails from '@/components/widgets/userDetails/index.vue'
import widgetsTodo from '@/components/widgets/todo/index.vue'

export default {
  name: 'AboutPage',
  components: {
    widgetsTodo,
    widgetsUserDetails
  },
  setup() {
    const store = useStore()
    const userId = computed(() => store.getters.getUserId)
    return {userId}
  }
}
</script>

<style lang="sass" scoped>
.about
  margin: 0 20px
  display: flex
  justify-content: center
  @media screen and (max-width: 768px)
    display: block
</style>

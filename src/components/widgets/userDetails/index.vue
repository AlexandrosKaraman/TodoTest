<template lang="pug">
  .wrapper
    template(v-if="user && user?.id")
      user-title(:name="user.name" :username="user.username")
      user-item(:item="user")
    template(v-else)
      h2 User data not exists
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

import UserItem from '@/components/features/userDetails/item.vue'
import UserTitle from '@/components/features/userDetails/title.vue'

export default {
  name: 'widgetsUserDetails',
  components: { UserItem, UserTitle },
  setup() {
    const store = useStore()

    const user = ref(null)

    const userId = computed(() => store.getters['getUserId'])

    onMounted(async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId.value}`,
      )

      user.value = await response.json()
    })

    return {
      user,
    }
  },
}
</script>

<style lang="sass" scoped>
.wrapper
  padding: 10px

  h2
    margin: 20px
    color: var(--white-color)

  @media screen and (max-width: 768px)
    padding: 0 0 10px 0
</style>

<template lang="pug">
  button.button-logout(@click="logout") Logout
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TodoLogout',
  setup() {
    const router = useRouter()
    const logout = () => {
      localStorage.clear()
      router.push('/')
    }

    return {
      logout,
    }
  },
}
</script>
<style lang="sass" scoped>
.button-logout
  color: var(--red-color)

  &:hover
    color: var(--white-color)
</style>

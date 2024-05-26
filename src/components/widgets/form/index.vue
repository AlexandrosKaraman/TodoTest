<template lang="pug">
  .wrapper
    form.login(@submit.prevent="login")
      .login_input
        ui-input(label="description" v-model="userName" placeholder="Username" :disabled="loadStatus" allow-letters)
        ui-input(placeholder="Phone Number" v-model="phone" :disabled="loadStatus" allow-numbers-and-symbol)
      ui-button.login_button(:name="loadStatus ? 'In process...' : 'Sign Up'" :class="{ 'loading': loadStatus }" @click="login" :disabled="loadStatus" type="submit")
      form-error.login_error(v-if="loginError" error="Login error. Please try again.")
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import FormError from '@/components/features/form/formError.vue'
import UiInput from '@/components/ui/input/index.vue'
import UiButton from '@/components/ui/button/index.vue'

export default {
  name: 'widgetsLoginForm',
  components: { FormError, UiButton, UiInput },
  setup() {
    const store = useStore()
    const router = useRouter()

    const loadStatus = ref(false)
    const loginError = ref(false)
    const userName = ref('')
    const phone = ref('')

    const getUsers = computed(() => store.getters.getAll)
    const filterUsers = computed(() => {
      return getUsers.value.map(user => ({
        id: user.id,
        username: user.username,
        phone: user.phone,
      }))
    })
    const cleanedUsers = computed(() => {
      return filterUsers.value.map(user => ({
        id: user.id,
        username: user.username.replace(/[\s._]/g, ''),
        phone: user.phone.replace(/[^0-9\-()]/g, ''),
      }))
    })

    const login = async () => {
      if (!userName.value || !phone.value) {
        loginError.value = true
        return
      }
      loadStatus.value = true
      loginError.value = false
      const user = cleanedUsers.value.find(
        u => u.username === userName.value && u.phone === phone.value,
      )
      await new Promise(resolve => setTimeout(resolve, 2500))
      if (user) {
        store.commit('SET_USER_ID', user.id)
        localStorage.setItem('userId', user.id)
        router.push('/about')
      } else {
        loginError.value = true
      }
      loadStatus.value = false
    }

    return {
      loadStatus,
      userName,
      phone,
      loginError,
      login,
    }
  },
}
</script>

<style lang="sass" scoped>
.login
  max-width: 447px
  min-width: 447px
  text-align: center
  background-color: var(--grey-color-100)

  &_input
    display: grid
    row-gap: 20px
    padding: 15px 25px 25px 25px

  &_button
    width: 200px
    margin: 0 25px 25px 25px

    &.loading
      cursor: not-allowed
      color: var(--black-color)
      background-color: var(--yellow-color)
      opacity: .5

  &_error
    padding-bottom: 15px
    color: var(--red-color)

  @media screen and (max-width: 768px)
    max-width: 347px
    min-width: 347px
</style>

<template lang="pug">
  .title
    .title__block
      h1 {{ username }}
      todo-logout.logout
</template>

<script>
import TodoLogout from '@/components/features/todo/logout.vue'

export default {
  name: 'userTitle',
  components: { TodoLogout },
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
    username: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="sass" scoped>
.title
  display: block
  margin: 20px 10px

  &__block
    h1
      color: var(--white-color)
    .logout
      display: none
    @media screen and (max-width: 768px)
      display: flex
      justify-content: space-between
      align-items: center
      h1
        font-size: 24px
      .logout
        display: block
</style>

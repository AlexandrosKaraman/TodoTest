<template lang="pug">
  .title
    .title__block
      h1 {{ username }}
</template>

<script>
export default {
  name: 'userTitle',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    username: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  display: block
  margin: 20px 10px
  &__block
    h1
      color: var(--white-color)
</style>

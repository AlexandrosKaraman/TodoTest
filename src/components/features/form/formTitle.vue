<template lang="pug">
  p.title {{ title }}
</template>

<script>
export default {
  name: 'formTitle',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  min-height: 55px
  text-align: center
  color: var(--grey-color)
  background-color: var(--grey-color-100)
  padding: 15px 0
</style>

<template lang="pug">
  h1.title
    slot
</template>

<script>
export default {
  name: 'TodoTitle',
}
</script>

<style lang="sass" scoped>
.title
  color: var(--white-color)
  @media screen and (max-width: 768px)
    font-size: 24px
</style>

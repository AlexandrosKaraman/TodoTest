<template lang="pug">
  .page_wrapper
    widgets-login-form
</template>

<script>
import widgetsLoginForm from '@/components/widgets/form/index.vue'
export default {
  name: 'HomePage',
  components: {widgetsLoginForm}
}
</script>

<style lang="sass" scoped>
.page_wrapper
  height: 100vh
  margin: 0 auto
  display: flex
  justify-content: center
  align-items: center
</style>

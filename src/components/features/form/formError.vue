<template lang="pug">
  p.error {{ error }}
</template>

<script>
export default {
  name: 'formError',
  props: {
    error: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<template lang="pug">
  .checkbox
    input(type="checkbox" :checked="value")
    span.checkbox-checkmark
</template>

<script>
// Mock-component for preview checked status
export default {
  name: 'UiCheckbox',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
.checkbox
  display: inline-block
  position: relative
  padding-left: 28px
  margin-bottom: 0
  cursor: pointer
  user-select: none
  font-size: 16px
.checkbox input
  width: 16px
  height: 18px
  position: relative
  left: -26px
  z-index: 999
  opacity: 0
  cursor: pointer
.checkbox-checkmark
  position: absolute
  top: 0
  left: 0
  height: 20px
  width: 20px
  background-color: var(--white-color)
  border: 2px solid #ccc
  border-radius: 4px
.checkbox input:checked ~ .checkbox-checkmark:after
  display: block
.checkbox .checkbox-checkmark:after
  content: ""
  position: absolute
  display: none
  left: 7px
  top: 3px
  width: 5px
  height: 10px
  border: solid #000
  border-width: 0 3px 3px 0
  transform: rotate(45deg)
</style>

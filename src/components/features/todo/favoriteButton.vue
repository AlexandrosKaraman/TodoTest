<template lang="pug">
  .wrapper_button
    button.favorite-button(@click="toggleFavorite")
      icon-star.favorite-icon(:is-favorite="isFavorite" :class="{'favorite-icon-yellow': isFavorite}")
</template>

<script>

import IconStar from "@/components/ui/svg/star.vue"

export default {
  name: 'favoriteButton',
  components: {
    IconStar
  },
  props: {
    todo: {
      type: Object,
      required: true,
      default: () => ({})
    },
    favoriteList: {
      type: Array,
      required: true,
      default: () => []
    },
    isFavorite: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleFavorite = () => {
      if (props.isFavorite) {
        emit('remove-from-favorite', props.todo.id)
      } else {
        emit('add-to-favorite', props.todo.id)
      }
    }
    return {toggleFavorite}
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.favorite-icon-yellow)
  path
    fill: #FAC608
.favorite-icon
  width: 30px
.favorite-button
  border: none
  background-color: transparent
  cursor: pointer
</style>

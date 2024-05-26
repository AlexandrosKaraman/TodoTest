<template lang="pug">
  .todos
    .todos__item(
      v-for="(item, id) in user"
      :key="id"
    )
      p {{ item.title }}
      .todos__item-ui
        favorite-button(
          :todo="item"
          :favorite-list="favoriteList"
          :is-favorite="isFavorite(item.id)"
          @remove-from-favorite="removeFromFavorite"
          @add-to-favorite="addToFavorite"
        )
        ui-checkbox(:value="item.completed")
</template>

<script>
import { onMounted, ref } from 'vue'

import UiCheckbox from '@/components/ui/checkbox/index.vue'
import FavoriteButton from '@/components/features/todo/favoriteButton.vue'

export default {
  name: 'MyTodos',
  components: {
    UiCheckbox,
    FavoriteButton,
  },
  props: {
    user: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const favoriteList = ref([])

    const isFavorite = id => favoriteList.value.includes(id)
    const addToFavorite = id => {
      if (!favoriteList.value.includes(id)) {
        favoriteList.value.push(id)
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList.value))
      }
    }
    const removeFromFavorite = id => {
      if (favoriteList.value.includes(id)) {
        const index = favoriteList.value.indexOf(id)
        favoriteList.value.splice(index, 1)
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList.value))
      }
    }
    const toggleFavorite = id =>
      isFavorite(id) ? removeFromFavorite(id) : addToFavorite(id)

    onMounted(() => {
      const favorites = JSON.parse(localStorage.getItem('favoriteList'))
      if (favorites && favorites.length > 0) {
        favoriteList.value = favorites
      }
    })

    return {
      favoriteList,
      isFavorite,
      addToFavorite,
      removeFromFavorite,
      toggleFavorite,
    }
  },
}
</script>

<style lang="sass" scoped>
.todos
  background-color: var(--white-color)
  padding: 15px

  &__item
    display: flex
    align-items: center
    justify-content: space-between
    gap: 10px
    padding: 5px

    &-ui
      display: flex
      align-items: center
      gap: 10px

    &:hover
      opacity: .8
      box-shadow: inset 20px 120px 0 20px wheat

  @media screen and (max-width: 768px)
    &__item
      font-size: 12px
</style>

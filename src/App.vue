<template lang="pug">
  router-view
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const updateUserId = () => {
  const userId = localStorage.getItem('userId')
  if (userId) store.commit('SET_USER_ID', userId)
}

onMounted(() => {
  updateUserId()
  store.dispatch('fetchUsers')
})
</script>

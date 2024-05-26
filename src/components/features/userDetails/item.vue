<template lang="pug">
  .wrapper
    .item
      strong email:
      span.item {{ item.email }}
    .item
      strong phone:
      span.item {{ item.phone }}
    .item
      strong street:
      span.item {{ item.address.street }}
    .item
      strong suite:
      span.item {{ item.address.suite }}
    .item
      strong city:
      span.item {{ item.address.city }}
    .item
      strong zipcode:
      span.item {{ item.address.zipcode }}
    .item
      strong company:
      span.item {{ item.company.name }}
    .item
      strong phrase:
      span.item {{ item.company.catchPhrase }}
    .item
      strong bs:
      span.item {{ item.company.bs }}
</template>

<script>
export default {
  name: 'userItem',
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  min-width: 360px
  border: none
  box-shadow: 0 0 22px 5px rgba(0, 0, 0, 0.2)
  background-color: var(--white-color)
  display: flex
  flex-direction: column
  .item
    width: 100%
    border-radius: 5px
    padding: 4px
    display: flex
    align-items: center
    column-gap: 6px
    strong
      padding: 5px
      border-radius: 5px
</style>

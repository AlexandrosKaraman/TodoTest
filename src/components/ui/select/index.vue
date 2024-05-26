<template lang="pug">
  .field_wrapper.custom_select(v-click-outside="closeList")
    span.label(
      v-if="label"
      @click.prevent="toggleList()"
    ) {{ label }}
    .select_wrapper
      .field(
        :class="{ active: viewOption, disabled: disabled, 'with-error': messageIsError }"
        @click.prevent="disabled ? () => {} : toggleList()"
      )
        span.current_value {{ modelValue ? modelValue?.name : (placeholder || 'Select list') }}
        span.icon(:class="{ active: viewOption }")
          arrow-down
      .options_wrapper(
        v-if="viewOption"
      )
        input.search_field(
          v-if="withSearch"
          v-model="searchValue"
          placeholder="Search"
        )
        span.option(
          v-for="(opt, key) in options.filter((o) => (o.name.toLowerCase()).includes(searchValue.toLowerCase()))"
          :key="key"
          :class="{ active: modelValue === opt, disabled: opt.disabled || false }"
          @click.prevent="updateValue(opt)"
        ) {{ opt.name }}
    p.message(
      v-if="messageText"
      :class="{error: messageIsError}"
    ) {{ messageText }}
</template>

<script>
import {computed, ref} from "vue"
import ArrowDown from "@/components/ui/svg/arrow.vue"

export default {
  name: 'UiSelectList',
  components: {ArrowDown},
  props: {
    id: {
      type: String,
      required: false,
      default: 'base_select'
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    withSearch: {
      type: Boolean,
      required: false,
      default: false
    },
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      required: false,
      default: null
    },
    options: {
      type: Array,
      required: false,
      default: () => ([])
    },
    messageIsError: {
      type: Boolean,
      required: false,
      default: false
    },
    messageText: {
      type: String,
      required: false,
      default: null
    },
    updateByLangSwitch: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const searchValue = ref('')
    const viewOption = ref(false)
    const toggleList = (val) => {
      if (!props.disabled) {
        viewOption.value = val !== undefined ? val : !viewOption.value
      }
    }
    const closeList = () => {
      viewOption.value = false
    }
    const updateValue = (val) => {
      if (!props.disabled) {
        emit('update:modelValue', val)
        toggleList(false)
      }
    }
    const filteredOptions = computed(() => {
      return props.options.filter((o) =>
          o.name.toLowerCase().includes(searchValue.value.toLowerCase())
      )
    })

    return {
      searchValue,
      viewOption,
      toggleList,
      closeList,
      updateValue,
      filteredOptions
    }
  }
}
</script>

<style lang="sass">
.field_wrapper
  position: relative
  width: auto
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: flex-start
  .label
    width: 100%
    margin-bottom: 4px
    color: var(--black-color)
    cursor: pointer
  .wrapper_input
    width: 100%
    min-height: 60px
    max-height: 60px
    border: 1px solid black
    background-color: var(--white-color) !important
    display: flex
    flex-direction: row
    justify-content: flex-start
    align-items: center
    overflow: hidden
    position: relative
    .prefix,
    .suffix
      padding-top: 2px
      cursor: pointer
    .field
      width: 100%
      padding: 4px 0 2px
      color: var(--black-color)
      background: transparent !important
      border: none
      outline: none
      box-shadow: inset 20px 120px 0 20px wheat
      &[disabled],
      &.disabled
        cursor: not-allowed
        box-shadow: none
    .field_loading
      position: absolute
      top: 50%
      right: 10px
      width: 20px
      height: 20px
      transform: translateY(-50%)
      &::after
        content: ' '
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        animation: rotate 1s linear infinite
    &.disabled
      background-color: grey !important
      .field
        box-shadow: none
    &.with-error
      color: var(--red-color)
      border-color: var(--red-color)
      .field::placeholder
        color: var(--red-color)
  &.custom_select
    width: 100%
    .select_wrapper
      width: 100%
      display: flex
      flex-direction: column
      position: relative
      .field
        width: 100%
        gap: 16px
        padding: 18px 16px 14px 16px
        border: none
        background-color: var(--white-color) !important
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        cursor: pointer
        position: relative
        .current_value
          max-width: 100%
          width: 100%
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
        .icon
          min-width: 14px
          max-width: 14px
          min-height: 14px
          max-height: 14px
          padding: 2px
          margin-left: 8px
          fill: black
        &.disabled
          background-color: grey !important
          cursor: not-allowed
        &.active .icon
          transform: rotate(180deg)
      .options_wrapper
        width: 100%
        max-height: 290px
        padding: 12px 0
        background-color: var(--white-color)
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15)
        display: flex
        flex-direction: column
        justify-content: flex-start
        align-items: flex-start
        overflow-y: auto
        position: absolute
        top: 100%
        left: 0
        z-index: 1
        .search_field
          max-width: calc(100% - 20px)
          width: 100%
          margin: 0 10px
          padding: 5px 0
          border: none
          border-bottom: 1px solid black
          background-color: transparent !important
          display: flex
          flex-direction: row
          justify-content: flex-start
          align-items: center
          outline: none
          z-index: 1
        .option
          width: 100%
          min-height: max-content
          padding: 10px
          display: flex
          flex-direction: row
          justify-content: flex-start
          align-items: center
          z-index: 1
          &.disabled:hover
            background-color: wheat
            cursor: pointer
          &:not(.disabled):hover
            background-color: wheat
            cursor: pointer
          &.active
            font-weight: 700
  .input_wrapper
    width: 100%
    min-height: 60px
    max-height: 60px
    display: flex
    flex-direction: row
    justify-content: flex-start
    align-items: center
    position: relative
  .field_btn
    min-height: 22px
    max-height: 22px
    min-width: 22px
    max-width: 22px
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    .icon
      fill: grey
      transition: fill .5s ease
    &:hover .icon
      fill: black
</style>

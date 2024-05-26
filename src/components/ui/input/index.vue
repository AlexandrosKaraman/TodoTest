<template lang="pug">
  .input_wrapper
    p.label(v-if="label") {{ label }}
    input.field(
      maxlength="25"
      :type="type"
      :value="modelValue"
      v-bind="$attrs"
      @input="updateValue"
      :placeholder="placeholder"
    )
    .error(v-if="error") {{ error }}
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'UiInput',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    allowLetters: {
      type: Boolean,
      default: false,
    },
    allowNumbersAndSymbol: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const modelValue = ref(props.value)
    const error = ref('')

    const updateValue = event => {
      let value = event.target.value
      if (props.allowLetters) {
        value = value.replace(/[^a-zA-Z]/g, '')
      }
      if (props.allowNumbersAndSymbol) {
        value = value.replace(/[^0-9\-()]/g, '')
      }
      modelValue.value = value
      emit('update:modelValue', modelValue.value)
    }

    watch(
      () => props.value,
      newVal => {
        modelValue.value = newVal
      },
    )
    watch(modelValue, newVal => {
      if (props.regex && !props.regex.test(newVal)) {
        error.value = 'Invalid input'
      } else {
        error.value = ''
      }
      emit('update:modelValue', newVal)
    })

    return {
      modelValue,
      error,
      updateValue,
    }
  },
}
</script>

<style lang="sass" scoped>
.input_wrapper
  width: 100%
  display: flex
  flex-direction: column
  row-gap: 14px

  .label
    color: var(--grey-color)
    font-size: 15px

  .field
    width: 100%
    min-height: 41px
    padding: 5px
    color: var(--black-color)
</style>

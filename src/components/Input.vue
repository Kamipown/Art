<template>
  <label class="input">
    <div class="label">
      <p>{{ props.label }}</p>
      <span v-if="props.optional">Optional</span>
    </div>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="onInput"
      :disabled="props.disabled"
    />
    <p v-if="props.error">{{ props.error }}</p>
  </label>
</template>

<script setup>
const { t } = useI18n()

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: [Number, String],
  },
  optional: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    required: true
  },
})

const emits = defineEmits(['update:modelValue'])

const onInput = e => {
  console.log(props.type)
  emits('update:modelValue', e.target.value)
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  > .label {
    display: flex;
    padding: 0 8px;
    > p {
      flex: 1;
      line-height: 16px;
    }
    > span {
      line-height: 12px;
      font-size: 12px;
    }
  }
  > input {
    height: 48px;
    padding: 0 16px;
    border: 2px solid $dark2;
    border-radius: 8px;
    background-color: transparent;
    color: $light9;
    font-size: 1rem;
    font-family: "Roboto Condensed";
    cursor: pointer;
    &::-webkit-calendar-picker-indicator {
      padding: 4px 8px;
      background-color: $primary4;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 200ms ease-in-out;
      // filter: invert(1);
    }
    &::-webkit-calendar-picker-indicator:hover {
      background-color: $primary5;
    }
    &::-webkit-calendar-picker-indicator:active {
      background-color: $primary6;
      transition: none;
    }
    &:focus {
      border-color: $primary4;
    }
  }
  > p {
    line-height: 16px;
    padding: 0 8px;
    color: $error4;
  }
}
</style>

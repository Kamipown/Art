<template>
  <div class="button" :class="[props.type, { small: props.small }]">
    <Icon v-if="props.icon" :name="props.icon" size="24" />
    <p v-if="props.text">{{ props.text }}</p>
  </div>
</template>

<script setup>
import { Icon } from '@/components'

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  text: {
    type: String,
    default: ""
  },
  small: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: all 200ms ease-in-out;
  &:not(.small) {
    height: 64px;
  }
  &.small {
    height: 36px;
  }
  > p {
    font-weight: 700;
    font-size: 16px;
  }
  &.primary {
    background-color: $primary4;
    > .icon,
    > p {
      color: $dark0;
    }
    &:hover {
      background-color: $primary5;
    }
    &:active {
      background-color: $primary6;
      transition: none;
    }
  }
  &.secondary {
    border: 2px solid $primary4;
    > .icon,
    > p {
      color: $primary4;
    }
    &:hover {
      border-color: $primary5;
    }
    &:active {
      border-color: $primary6;
      transition: none;
    }
  }
}
</style>

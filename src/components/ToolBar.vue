<template>
  <div class="toolBar">
    <div class="content">
      <div class="left">
        <slot />
      </div>
      <div class="right">
        <Button
          v-for="action in props.actions"
          :key="action.name"
          :text="action.name"
          :icon="action.icon || 'plus'"
          small
          @click="action.callback"
        />
      </div>
    </div>
    <Separator />
  </div>
</template>

<script setup>
import { Button, Separator } from '@/components'

const props = defineProps({
  actions: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['add'])

const add = () => emits('add')
</script>

<style lang="scss" scoped>
.toolBar {
  user-select: none;
  > .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    background-color: $dark7;
    > div {
      &.left {
        padding: 16px;
      }
      &.right {
        display: flex;
        column-gap: 16px;
        padding: 16px;
      }
    }
  }
}
</style>

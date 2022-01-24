<template>
  <div class="imageSelector" :class="state">
    <p>{{ props.text }}</p>
    <Icon name="import" size="20" />
    <input
      type="file"
      accept="image/jpeg, image/png"
      title
      multiple
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDrop"
      @change="onChange"
    />
  </div>
</template>

<script setup>
import Icon from '@/components/Icon'

const props = defineProps({
  text: {
    type: String,
    default: 'Select or drop images'
  }
})

const emits = defineEmits(['change'])

const state = reactive({
  hovering: false,
  clicking: false,
  dragging: false
})

const onMouseEnter = () => { state.hovering = true; }
const onMouseLeave = () => { state.hovering = false; state.clicking = false; }
const onMouseDown = () => { state.clicking = true; }
const onMouseUp = () => { state.clicking = false; }
const onDragEnter = () => { state.dragging = true; }
const onDragLeave = () => { state.dragging = false; }
const onDrop = () => { state.dragging = false; }

const onChange = e => emits('change', e.target.files)
</script>

<style lang="scss" scoped>
.imageSelector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 64px;
  padding: 0 32px;
  border: 2px solid $dark2;
  border-radius: 8px;
  background-color: transparent;
  user-select: none;
  transition: height 200ms ease-in-out, background-color 200ms ease-in-out;
  > input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  > p {
    font-weight: 500;
  }
  &.hovering {
    border-color: $dark0;
  }
  &.clicking {
    border-color: $primary5;
    transition: none;
  }
  &.dragging {
    height: 128px;
    border-color: $dark0;
  }
}
</style>

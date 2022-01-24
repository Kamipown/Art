<template>
  <div class="select" :class="{ active }">
    <div ref="content" class="content" @click="onClick">
      <p>{{ props.selected }}</p>
      <Icon name="angle-down" />
    </div>
    <div class="list">
      <div
        class="item"
        v-for="option in props.options"
        :key="option"
        @click="() => onListClick(option)"
      >
        <p>{{ option }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'

import { Icon } from '@/components'

const props = defineProps({
  selected: {
    type: String
  },
  options: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['change'])

const content = ref(null)

const active = ref(false)

const onClick = () => {
  active.value = !active.value
}

const onListClick = option => {
  emits('change', option)
}

onClickOutside(content, () => {
  if (!active.value)
    return
  active.value = false
})

</script>

<style lang="scss" scoped>
.select {
  position: relative;
  user-select: none;
  > .content {
    display: flex;
    align-items: center;
    column-gap: 16px;
    padding: 16px;
    border: 2px solid $dark2;
    border-radius: 8px;
    cursor: pointer;
    > p {
      font-weight: 500;
    }
  }
  > .list {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    padding: 8px 0;
    // border-radius: 0 8px 8px 8px;
    border-radius: 8px;
    background-color: $dark2;
    > .item {
      padding: 16px 16px;
    }
  }
  &.active > .list {
    display: block;
  }
  &:hover {
    > .content {
      border-color: $dark0;
    }
  }
  &:not(.active) {
  }
  &.active {
    > .content {
      // border-radius: 8px 8px 0 0;
      border-color: $dark0;
    }
    > .list {
      display: block;
    }
  }
}
</style>

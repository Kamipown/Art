<template>
  <transition name="fade">
    <div v-if="isLoading" class="appLoader" :show="props.show">
      <Spinner :small="props.small" />
    </div>
  </transition>
</template>

<script setup>
import { Spinner } from '@/components'

const store = useStore()

const props = defineProps({
  small: {
    type: Boolean,
    default: false
  }
})

const isLoading = computed(() => store.getters['isLoading'])

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
  > .inner {
    transition: transform 200ms ease;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.appLoader {
  position: absolute;
  @include depth(loader);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  > svg {
    animation: spin 1000ms linear infinite;
    fill: $primary4;
  }
}
</style>

<template>
  <SpinnerSmall v-if="props.small" />
  <Spinner v-else />
</template>

<script setup>
import { Spinner, SpinnerSmall } from '@/svg'

const props = defineProps({
  small: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
svg {
  animation: spin 1000ms linear infinite;
  fill: $primary4;
}
</style>

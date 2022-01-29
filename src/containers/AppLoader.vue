<template>
  <div class="appLoader">
    <Spinner />
  </div>
</template>

<script setup>
import { Spinner } from '@/components'
</script>

<style lang="scss" scoped>
.appLoader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  > svg {
    animation: spin 1000ms linear infinite;
    fill: $primary4;
  }
}
</style>

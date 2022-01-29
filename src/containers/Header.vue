<template>
  <header class="header">
    <RouterLink class="logo" to="/">
      <LogoFull />
    </RouterLink>
  </header>
</template>

<script setup>
import { LogoFull } from '@/svg'
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 64px;
  background-color: $dark9;
  > .logo {
    display: flex;
    align-items: center;
    height: 100%;
    column-gap: 16px;
    padding: 32px;
    > svg {
      height: 48px;
      > :deep(.art) {
        fill: $primary4;
      }
      > :deep(.progress),
      :deep(.tracker) {
        fill: $white;
      }
      fill: $light9;
    }
  }
}
</style>

<template>
  <header>
    <div class="content">
      <RouterLink class="logo" to="/">
        <LogoFull />
      </RouterLink>
      <nav>
        <NavLink text="Gallery" to="/" />
        <NavLink text="Statistics" to="/statistics" />
        <NavLink text="Admin" to="/admin" v-if="isAdmin" />
      </nav>
    </div>
    <Separator />
  </header>
</template>

<script setup>
import { LogoFull } from '@/svg'
import { NavLink, Separator } from '@/components'

const store = useStore()

const isAdmin = computed(() => store.getters['isAdmin'])
</script>

<style lang="scss" scoped>
header {
  // position: relative;
  // z-index: 1;
  > .content {
    display: flex;
    align-items: center;
    column-gap: 64px;
    height: 64px;
    background-color: $dark9;
    > .logo {
      display: flex;
      align-items: center;
      height: 100%;
      column-gap: 16px;
      padding: 0 16px;
      > svg {
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
    > nav {
      display: flex;
    }
  }
}
</style>

<template>
  <AppLoader v-if="isLoading" />
  <template v-else>
    <div class="app" :class="{ blurred: isBlurred }">
      <Header />
      <MonthSelector />
      <RouterView />
    </div>
    <Viewer v-if="route.query.id" />
  </template>
</template>

<script setup>
import { AppLoader, Header, MonthSelector, Viewer } from '@/containers'

const store = useStore()
const route = useRoute()

const isLoading = computed(() => store.getters['isLoading'])
const isBlurred = computed(() => store.getters['isBlurred'])

onMounted(() => store.dispatch('load'))
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400&family=Roboto+Condensed:wght@400;500;700&display=swap");
@import url("https://unicons.iconscout.com/release/v4.0.0/css/line.css");

:global(*) {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  &:focus {
    outline: none;
  }
}

:global(html) {
  height: 100%;
}

:global(body) {
  height: 100%;
  margin: 0;
  font-family: "Roboto Condensed";
  font-size: 16px;
  color: $light9;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow: auto;
  & {
    scrollbar-width: none;
    scrollbar-color: $dark9 $dark7;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    border: 2px solid $dark7;
    background: $dark7;
  }
  &::-webkit-scrollbar-thumb {
    border: 2px solid $dark7;
    background-color: $dark9;
  }
  &.blurred {
    filter: blur(10px);
  }
}
</style>

<template>
  <div class="app" :class="{ blurred: isBlurred }">
    <Header />
    <RouterView />
    <AdminDetector v-if="!isAdmin" />
    <AppLoader />
  </div>
</template>

<script setup>
import { AdminDetector, AppLoader, Header } from '@/containers'
import { onMounted } from 'vue'

const store = useStore()

const isAdmin = computed(() => store.getters['isAdmin'])
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
  position: relative;
  height: 100%;
  overflow: hidden;
  transition: filter 200ms ease-in-out;
  &.blurred {
    filter: blur(10px);
  }
  .fade-enter-active {
    transition: opacity 200ms ease 200ms;
  }
  .fade-leave-active {
    transition: opacity 200ms ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>

<template>
  <div class="app"></div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Roboto:wght@400;500;700&display=swap");
@import url("https://unicons.iconscout.com/release/v4.0.0/css/line.css");

:global(*) {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:global(html) {
  height: 100%;
}

:global(body) {
  height: 100%;
  margin: 0;
  font-family: "Roboto";
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  position: relative;
  height: 100%;
  overflow: hidden;
  .fade-enter-active {
    transition: opacity 0.2s ease 0.2s;
  }
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
}
</style>

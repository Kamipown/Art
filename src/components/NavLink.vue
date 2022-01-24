<template>
  <RouterLink class="navLink" :to="props.to">
    {{ props.text }}
    <div />
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
a {
  position: relative;
  display: block;
  line-height: 64px;
  padding: 0 16px;
  text-decoration: none;
  font-family: "Oswald";
  font-size: 20px;
  color: $light9;
  user-select: none;
  > div {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: transparent;
    opacity: 0;
    transform: scaleX(0);
    transition: all 200ms ease-in-out;
  }
  &:not(.router-link-active):hover {
    > div {
      opacity: 1;
      transform: scaleX(1);
      background-color: $dark0;
    }
  }
  &.router-link-active {
    > div {
      opacity: 1;
      transform: scaleX(1);
      background-color: $primary5;
    }
  }
}
</style>

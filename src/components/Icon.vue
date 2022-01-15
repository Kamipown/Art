<template>
  <i :class="`icon uil uil-${props.name}`" />
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  }
})
const s = computed(() => `${props.size}px`)
</script>

<style lang="scss" scoped>
.icon {
  width: v-bind("s");
  height: v-bind("s");
  line-height: v-bind("s");
  font-size: v-bind("s");
}
</style>

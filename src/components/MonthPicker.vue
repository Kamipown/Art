<template>
  <div class="monthPicker">
    <div class="content"></div>
    <Separator />
  </div>
</template>

<script setup>
import { Separator } from '@/components'
</script>

<style lang="scss" scoped>
.monthPicker {
  user-select: none;
  > .content {
    height: 64px;
    background-color: $dark7;
  }
}
</style>

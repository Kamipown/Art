<template>
  <div class="statisticsScreen">
    <h2>Statistics</h2>
    <p>{{ t('lang') }}</p>
  </div>
</template>

<script setup>
// import { Page } from '@/components'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.statisticsScreen {
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
}
</style>

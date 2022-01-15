<template>
  <Page>
    <p>{{ t('lang') }}</p>
  </Page>
</template>

<script setup>
import { Page } from '@/components'

const { t } = useI18n()
</script>

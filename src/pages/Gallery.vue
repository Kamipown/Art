<template>
  <div class="galleryScreen">
    <ToolBar :actions="[{ name: 'Add images', icon: 'image-plus', callback: openAddImagesPopup }]" />
    <div class="content">
      <p>{{ t('lang') }}</p>
      <img src="/files/1.jpg" />
    </div>
    <AddImagesPopup :show="state.showAddImagesPopup" @close="closeAddImagesPopup" />
  </div>
</template>

<script setup>
import { AddImagesPopup } from '@/containers'
import { ToolBar } from '@/components'

const { t } = useI18n()

const state = reactive({
  showAddImagesPopup: false,
})

const openAddImagesPopup = () => {
  state.showAddImagesPopup = true
}
const closeAddImagesPopup = () => {
  state.showAddImagesPopup = false
}
</script>

<style lang="scss" scoped>
.galleryScreen {
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
  > .content {
    flex: 1;
    overflow: auto;
    padding: 32px;
  }
}
</style>

<template>
  <div class="projectsScreen">
    <ToolBar
      :actions="[{ name: 'Add project', icon: 'folder-plus', callback: openAddProjectPopup }]"
    />
    <div class="content">
      <p>{{ t('lang') }}</p>
    </div>
    <AddProjectPopup :show="state.showAddProjectPopup" @close="closeAddProjectPopup" />
  </div>
</template>

<script setup>
import { AddProjectPopup } from '@/containers'
import { ToolBar } from '@/components'

const { t } = useI18n()

const state = reactive({
  showAddProjectPopup: false,
})

const openAddProjectPopup = () => {
  state.showAddProjectPopup = true
}
const closeAddProjectPopup = () => {
  state.showAddProjectPopup = false
}
</script>

<style lang="scss" scoped>
.projectsScreen {
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
  > .content {
    flex: 1;
    overflow: auto;
    padding: 32px;
    > div {
      width: 200px;
      height: 200px;
      margin: 20px;
      border: 2px solid $primary7;
      &:focus {
        background-color: $primary5;
      }
    }
  }
}
</style>

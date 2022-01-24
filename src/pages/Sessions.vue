<template>
  <div class="sessionsScreen">
    <ToolBar
      :actions="[{ name: 'Add training', icon: 'edit', callback: openTrainingPopup }, { name: 'Add course', icon: 'notes', callback: openCoursePopup }]"
    />
    <div class="content">
      <p>{{ t('lang') }}</p>
    </div>
    <AddTrainingPopup :show="state.showTrainingPopup" @close="closeTrainingPopup" />
    <AddCoursePopup :show="state.showCoursePopup" @close="closeCoursePopup" />
  </div>
</template>

<script setup>
import { AddCoursePopup, AddTrainingPopup } from '@/containers'
import { ToolBar } from '@/components'

const { t } = useI18n()

const state = reactive({
  date: 'January 2022',
  showTrainingPopup: false,
  showCoursePopup: false,
})

const openTrainingPopup = () => {
  state.showTrainingPopup = true
}
const closeTrainingPopup = () => {
  state.showTrainingPopup = false
}

const openCoursePopup = () => {
  state.showCoursePopup = true
}
const closeCoursePopup = () => {
  state.showCoursePopup = false
}
</script>

<style lang="scss" scoped>
.sessionsScreen {
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

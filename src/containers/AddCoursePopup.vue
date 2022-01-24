<template>
  <Popup :show="props.show" title="Add course" @close="close">
    <div class="addCoursePopup">
      <Button text="Add course" small @click="send" />
    </div>
  </Popup>
</template>

<script setup>
import api from '@/api'
import { Button, Popup } from '@/components'

const { t } = useI18n()

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])

const state = reactive({
  loading: false
})

const close = () => {
  emits('close')
}

const send = async () => {
  state.loading = true
  try {
    await api.addSession({ type: 'c' })
  }
  catch (error) {
    console.log('error', error)
  }
  state.loading = false
}
</script>

<style lang="scss" scoped>
.addCoursePopup {
  padding: 16px;
}
</style>

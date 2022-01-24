<template>
  <Popup :show="props.show" title="Add project" @close="close">
    <div class="addProjectPopup">
      <Button text="Add project" small @click="send" />
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
    await api.addSession({ type: 't' })
  }
  catch (error) {
    console.log('error', error)
  }
  state.loading = false
}
</script>

<style lang="scss" scoped>
.addProjectPopup {
  padding: 16px;
}
</style>

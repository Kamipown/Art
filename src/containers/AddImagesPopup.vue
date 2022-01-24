<template>
  <Popup
    :show="props.show"
    title="Add images"
    :actions="[
      { type: 'secondary', name: 'Cancel', callback: close },
      { type: 'primary', name: 'Add images', callback: send },
    ]"
    @close="close"
  >
    <div class="addImagesPopup">
      <ImageSelector @change="onFilesChange" />
      <ul class="list" v-if="state.items.length">
        <li class="item" v-for="item in state.items" :key="item.data.name">
          <div class="preview">
            <img :src="item.data.src" />
          </div>
          <div class="right">
            <Input
              type="number"
              label="Parent ID"
              :error="item.parentIdError"
              v-model.number="item.parentId"
              :optional="true"
            />
            <Input
              type="datetime-local"
              label="Started at"
              :error="item.fromError"
              v-model="item.from"
            />
            <Input
              type="datetime-local"
              label="Finished at"
              :error="item.toError"
              v-model="item.to"
            />
          </div>
        </li>
      </ul>
    </div>
  </Popup>
</template>

<script setup>
import api from '@/api'
import { loadImage } from '@/lib'
import { Input, ImageSelector, Popup } from '@/components'

const { t } = useI18n()

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])

const state = reactive({
  loading: false,
  items: []
})

const onFilesChange = async files => {
  const items = []
  for (let file of files)
    items.push({
      data: await loadImage(file),
      parentId: undefined,
      from: "",
      to: "",

      parentIdError: "",
      fromError: "",
      toError: "",
    })
  console.log(items)
  state.items = items.sort((a, b) => a.data.date - b.data.date)
}

const close = () => {
  console.log(state.items)
  state.items = []
  emits('close')
}

const validateItem = item => {
  item.parentIdError = ''
  item.fromError = ''
  item.toError = ''

  // if (item.parentId)
  // item.parentIdError = ''

  if (!item.from)
    item.fromError = 'Required.'

  if (!item.to)
    item.toError = 'Required.'
  else if (item.from && !(item.from < item.to))
    item.toError = 'Should be later that start time.'
}

const validateItems = () => {
  let ret = true;
  for (let item of state.items) {
    validateItem(item)
    if (item.parentIdError || item.fromError || item.toError)
      ret = false
  }
  return ret
}

const send = async () => {
  state.loading = true
  try {
    if (validateItems()) {
      // await api.addImage({ type: 't' })
      await api.addImages(state.items.map(item => ({
        src: item.data.src,
        from: item.from,
        to: item.to
      })))
    }
  }
  catch (error) {
    console.log('error', error)
  }
  state.loading = false
}
</script>

<style lang="scss" scoped>
.addImagesPopup {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding: 32px;
  > .list {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    > .item {
      display: flex;
      column-gap: 16px;
      position: relative;
      padding: 16px;
      border: 2px solid $dark2;
      border-radius: 8px;
      overflow: hidden;
      list-style: none;
      > .preview {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        width: 236px;
        height: 236px;
        overflow: hidden;
        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      > .right {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        flex: 1;
      }
    }
  }
}
</style>

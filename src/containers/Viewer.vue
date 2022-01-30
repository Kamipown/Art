<template>
  <div class="viewer" @click="close">
    <div>
      <img :src="values.src" />
    </div>
    <nav v-if="values">
      <p>{{ values.date }}</p>
      <span />
      <p>{{ values.fromNow }}</p>
      <span />
      <p>{{ values.duration }}</p>
      <span />
      <p>{{ values.size }}</p>
    </nav>
  </div>
</template>

<script setup>
import moment from 'moment'

const { d } = useI18n()
const store = useStore()
const router = useRouter()
const route = useRoute()

const fullData = computed(() => store.getters['fullData'])

const values = computed(() => {
  if (fullData.value && route.query.id) {
    for (let i = 0; i < fullData.value.length; ++i) {
      for (let j = 0; j < fullData.value[i].images.length; ++j) {
        if (fullData.value[i].images[j].id == route.query.id) {
          return {
            src: `${window.location.pathname}/files/${fullData.value[i].date}/${route.query.id}.${fullData.value[i].images[j].type}`,
            date: d(fullData.value[i].images[j].from, 'long'),
            fromNow: moment(fullData.value[i].images[j].from).fromNow(),
            duration: getDuration(fullData.value[i].images[j]),
            size: `${fullData.value[i].images[j].width}x${fullData.value[i].images[j].height}`
          }
        }
      }
    }
  }
  return null
})

const getDuration = image => {
  const n = (new Date(image.to) - new Date(image.from)) / 60000
  const hours = parseInt(n / 60)
  const minutes = n % 60
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

const close = () => {
  const query = Object.assign({}, route.query)
  delete query.id
  router.push({ path: route.path || '/', query })
}

onMounted(() => {
  store.dispatch('blur')
})
onUnmounted(() => {
  store.dispatch('unblur')
})
</script>

<style lang="scss" scoped>
.viewer {
  position: absolute;
  @include depth(modal);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    overflow: auto;
    & {
      scrollbar-width: none;
      scrollbar-color: $primary5 $dark7;
    }
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    &::-webkit-scrollbar-track {
      border: 2px solid $dark2;
      background: $dark7;
    }
    &::-webkit-scrollbar-thumb {
      border: 2px solid $dark2;
      background-color: $primary5;
    }
    &::-webkit-scrollbar-corner {
      background-color: $dark7;
    }
    > img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
    padding: 12px;
    background-color: $dark7;
    > p {
      line-height: 12px;
      font-size: 12px;
    }
    > span {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: $primary4;
    }
  }
}
</style>

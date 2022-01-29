<template>
  <div class="galleryScreen">
    <template v-for="item in items" :key="item.from">
      <div class="date" v-if="item.printDate">
        <p>{{ d(item.from, 'long') }}</p>
      </div>
      <div class="image" @click="() => open(item.id)">
        <img :src="item.src" />
      </div>
    </template>
  </div>
</template>

<script setup>
const { d } = useI18n()
const store = useStore()

const router = useRouter()
const route = useRoute()

const availableDates = computed(() => store.getters['availableDates'])
const data = computed(() => store.getters['data'])

const setDate = date => store.dispatch('setDate', date)

const items = computed(() => {
  let currentDate, ret = []
  if (data.value) {
    for (let image of data.value.images) {
      if (!currentDate || image.from.substring(0, 10) !== currentDate) {
        currentDate = image.from.substring(0, 10)
        image.printDate = true
      }
      image.src = `${window.location.pathname}/files/${data.value.date}/${image.id}.jpg`
      ret.push(image)
    }
  }
  return ret
})

const open = async id => {
  const query = Object.assign({}, route.query);
  if (!query.id) {
    query.id = id;
    await router.push({ query });
  }
}

onMounted(() => {
  if (route.params.date && !availableDates.value.includes(route.params.date))
    router.replace({ path: '/', query: route.query })
  else
    setDate(route.params.date || availableDates.value[0])
})

watch(() => route.params.date, () => {
  setDate(route.params.date || availableDates.value[0])
})
</script>

<style lang="scss" scoped>
.galleryScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: auto;
  padding: 8px 8px 64px 8px;
  > .date {
    margin-top: 64px;
    > p {
      font-size: 12px;
      font-weight: 600;
    }
  }
  > .image {
    margin-top: 32px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    user-select: none;
    > img {
      display: block;
      max-width: 100%;
      transform: scale(1);
      transition: all 200ms ease-in-out;
    }
    &:hover {
      > img {
        transform: scale(1.05);
      }
    }
  }
}
</style>

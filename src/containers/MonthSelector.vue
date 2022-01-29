<template>
  <div class="monthSelector">
    <div class="content">
      <div class="button" :class="{ disabled: !prevDate }" @click="prev">
        <Icon name="angle-left" size="32" />
      </div>
      <div class="current">
        {{ date }}
        <p v-if="date">{{ }}</p>
      </div>
      <div class="button" :class="{ disabled: !nextDate }" @click="next">
        <Icon name="angle-right" size="32" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@/components'

const { t, d } = useI18n()
const store = useStore()
const router = useRouter()

const date = computed(() => {
  let dt = store.getters['date']
  return (dt ? d(dt + '-01', 'monthYear') : '')
})
const prevDate = computed(() => store.getters['prevDate'])
const nextDate = computed(() => store.getters['nextDate'])

const next = () => {
  if (nextDate.value)
    router.push(nextDate.value)
}

const prev = () => {
  if (prevDate.value)
    router.push(prevDate.value)
}
</script>

<style lang="scss" scoped>
.monthSelector {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  @include depth(toolbar);
  width: 100%;
  box-shadow: 0 2px 4px $dark9;
  background-color: $dark7;
  > .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 600px;
    column-gap: 16px;
    margin: auto;
    padding: 8px;
    > .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background-color: $primary4;
      border-radius: 4px;
      cursor: pointer;
      transition: all 200ms ease-in-out;
      > .icon {
        color: $black;
      }
      &:not(.disabled) {
        &:hover {
          background-color: $primary5;
        }
        &:active {
          background-color: $primary6;
          transition: none;
        }
      }
      &.disabled {
        cursor: default;
        background-color: $dark8;
        > .icon {
          color: $dark5;
        }
      }
    }
    > .current {
      text-align: center;
      font-weight: 700;
      font-size: 20px;
      color: $white;
    }
  }
}
</style>

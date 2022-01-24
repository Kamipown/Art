<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="props.show" class="popup" @mousedown="close">
        <div class="inner" @mousedown.stop="() => { }">
          <header>
            <p>{{ props.title }}</p>
            <div @click="close">
              <Icon name="times" size="24" />
            </div>
          </header>
          <Separator />
          <div class="content">
            <slot />
          </div>
          <Separator />
          <nav>
            <Button
              v-for="action in props.actions"
              :key="action.name"
              :type="action.type"
              :text="action.name"
              :icon="action.icon"
              @click="action.callback"
              small
            />
          </nav>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { Button, Icon, Separator } from '@/components'

const store = useStore()

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  actions: {
    type: Array,
    default: () => []
  }
})

watch(() => props.show, show => {
  if (show)
    store.dispatch('blur')
  else
    store.dispatch('unblur')
})

const emits = defineEmits(['close'])

const close = () => emits('close')
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
  > .inner {
    transition: transform 200ms ease;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  > .inner {
    transform: scale(0.5) translateY(64px);
  }
}

.popup {
  position: absolute;
  @include depth(modal);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: rgba(0, 0, 0, 0.5);
  > .inner {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 1024px;
    max-height: 100%;
    border-radius: 8px;
    background-color: $dark7;
    > header {
      display: flex;
      align-items: center;
      > p {
        padding: 0 16px;
        flex: 1;
      }
      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        cursor: pointer;
        user-select: none;
      }
    }
    > .content {
      flex: 1;
      overflow-y: auto;
      & {
        scrollbar-width: none;
        scrollbar-color: $dark9 $dark7;
      }
      &::-webkit-scrollbar {
        width: 16px;
      }
      &::-webkit-scrollbar-track {
        background: $dark7;
      }
      &::-webkit-scrollbar-thumb {
        background-color: $dark9;
        border-radius: 10px;
        border: 4px solid $dark7;
      }
    }
    > nav {
      display: flex;
      justify-content: flex-end;
      column-gap: 16px;
      padding: 16px;
    }
  }
}
</style>

<template>
  <div class="adminScreen">
    <div class="left">
      <div class="card">
        <h2>Add {{ formState.type }}</h2>
        <Separator />
        <form :class="{ loading: state.loading }">
          <section class="type">
            <label>Type</label>
            <div>
              <p
                v-for="tp in defaults.types"
                :key="tp"
                :class="{ active: formState.type === tp }"
                @click="() => onTypeChange(tp)"
              >{{ tp.charAt(0).toUpperCase() + tp.slice(1) }}</p>
            </div>
          </section>
          <section class="from">
            <label>From</label>
            <input type="datetime-local" :value="formState.from" @change="onFromChange" />
          </section>
          <section class="to">
            <label>To</label>
            <input
              type="datetime-local"
              :value="formState.to"
              :min="formState.from"
              @change="onToChange"
            />
          </section>
          <section class="to">
            <label>Files</label>
            <ImageSelector @change="onFilesChange" />
          </section>
        </form>
        <Separator />
        <input type="button" :value="`Add ${formState.type}`" :disabled="!canSubmit" @click="send" />
      </div>
    </div>
    <div class="right">
      <div v-for="image in formState.images" :key="image.name">
        <img :src="image.src" />
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/api'
import { loadImage } from '@/lib'
import { ImageSelector, Separator } from '@/components'

const { t } = useI18n()

const defaults = {
  types: ['practice', 'course']
}

const state = reactive({
  loading: false,
  error: ''
})

const formState = reactive({
  type: defaults.types[0],
  from: '',
  to: '',
  images: []
})

const canSubmit = computed(() => formState.type && formState.from && formState.to && formState.images.length && (formState.from < formState.to))

const onTypeChange = type => {
  formState.type = type
}

const onFromChange = evt => {
  formState.from = evt.target.value
}

const onToChange = evt => {
  formState.to = evt.target.value
}

const onFilesChange = async files => {
  const images = []
  for (let file of files)
    images.push(await loadImage(file))
  formState.images = images.sort((a, b) => a.date - b.date)
}

const send = async () => {
  state.loading = true
  try {
    await api.add(formState)
  }
  catch (error) {
    console.log('error', error)
  }
  state.loading = false
}

</script>

<style lang="scss" scoped>
.adminScreen {
  display: flex;
  height: calc(100% - 64px);
  > .left {
    width: 512px;
    padding: 32px 16px 32px 32px;
    > .card {
      display: flex;
      flex-direction: column;
      max-height: 100%;
      border-radius: 8px;
      background-color: $dark7;
      > * {
        flex-shrink: 0;
      }
      > h2 {
        padding: 32px;
      }
      > form {
        flex: 1;
        padding: 32px;
        overflow: auto;

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
        &.loading {
          opacity: 0.2;
        }

        > section {
          display: flex;
          flex-direction: column;
          row-gap: 16px;
          > label {
            font-size: 14px;
            font-weight: 700;
          }
          &:not(:first-child) {
            margin-top: 32px;
          }
          &.type {
            > div {
              display: flex;
              column-gap: 16px;
              > p {
                flex: 1;
                line-height: 60px;
                border: 2px solid $dark2;
                border-radius: 8px;
                text-align: center;
                font-weight: 500;
                cursor: pointer;
                user-select: none;
                &:not(.active) {
                  &:hover {
                    border-color: $dark0;
                  }
                }
                &.active {
                  border-color: $primary5;
                }
              }
            }
          }
          &.from,
          &.to {
            > input {
              height: 64px;
              padding: 0 32px;
              border: 2px solid $dark2;
              border-radius: 8px;
              background-color: transparent;
              color: $light9;
              font-size: 1rem;
              font-family: "Roboto Condensed";
              cursor: pointer;
              &:invalid {
                border-color: $error5;
              }
              &:hover {
                border-color: $dark0;
              }
              &:focus {
                border-color: $primary5;
              }
              &::-webkit-calendar-picker-indicator {
                filter: invert(1);
              }
            }
          }
        }
      }
      > input {
        width: calc(100% - 64px);
        height: 64px;
        margin: 32px;
        border: none;
        border-radius: 8px;
        background-color: $primary5;
        font-weight: 700;
        font-size: 1rem;
        color: $light9;
        cursor: pointer;
        user-select: none;
        &:not(:disabled) {
          &:hover {
            background-color: $primary6;
          }
          &:active {
            background-color: $primary7;
          }
        }
        &:disabled {
          background-color: $dark4;
          color: $dark1;
          cursor: default;
        }
      }
    }
  }
  > .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    row-gap: 32px;
    padding: 32px 32px 32px 16px;
    overflow: auto;
    & {
      scrollbar-width: none;
      scrollbar-color: $dark7 $dark9;
    }
    &::-webkit-scrollbar {
      width: 16px;
    }
    &::-webkit-scrollbar-track {
      background: $dark9;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $dark7;
      border-radius: 10px;
      border: 4px solid $dark9;
    }
    > div {
      > img {
        max-width: 100%;
      }
    }
    > .preview {
      padding: 0 0 0 calc(512px + 32px);
    }
  }
}
</style>

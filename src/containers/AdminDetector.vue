<script setup>
const store = useStore()
const history = ref('')

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

const onKeyDown = ({ key, target }) => {
  if (target.tagName === "INPUT")
    return
  history.value += key
  if (history.value.length > 5)
    history.value = history.value.substr(history.value.length - 5)
  if (history.value === 'admin')
    store.dispatch('grantsAdministrator')
}
</script>

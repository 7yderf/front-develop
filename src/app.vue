<script setup lang="ts">
const store = useAuthStore()

useHead({
  titleTemplate: title => (title ? `${title} - Grupo torres ` : 'Grupo torres'),
})
const mediaQueryXL = useMediaQueryXL()
onMounted(async () => {
  const { windowSize } = useMediaQuery('(min-width: 1200px)')
  mediaQueryXL.value = windowSize
  watch(
    () => windowSize.value,
    value => { mediaQueryXL.value = value },
  )
})
if (process.client) {
  const { setUser } = store
  const user = localStorage.getItem('user')
  if (user) {
    setUser(JSON.parse(user))
  }
}
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

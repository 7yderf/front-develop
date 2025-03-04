<script setup lang="ts">
// const store = useAuthStore()

useHead({
  titleTemplate: title => (title ? `${title} - Grupo torres ` : 'Grupo torres'),
})

if (process.client) {
  // const { setUser } = store
  // const user = localStorage.getItem('user')
  // if (user) {
  //   setUser(JSON.parse(user))
  // }
}
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

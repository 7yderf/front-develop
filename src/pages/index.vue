<!-- eslint-disable vue/max-len -->
<template>
  <div class="body">
    <main class="home">
      <h1>
        Hola mundo
      </h1>
    </main>
  </div>
</template>

<script lang="ts" setup>

const from = 'home'

const load = useload()
const mounted = ref(false)

onMounted(async () => {
  setTimeout(() => {
    mounted.value = true
    load.value = false
  }, 100)
})

// onUnmounted(() => {
//   window.removeEventListener('scroll', animationScroll)
//   setTimeout(() => {
//     load.value = false
//     console.log('🚀 ~ setTimeout ~ load.value:', load.value)
//   }, 100)
// })

</script>
<style lang="scss" scoped>
@import "@/assets/scss/Home.scss";
</style>

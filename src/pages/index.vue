<!-- eslint-disable vue/max-len -->
<template>
  <div class="body">
    <main class="home">
      <p>Hola mundo</p>
      <div>{{ data }}</div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
// import { hasPermissionTo } from '@/utils/JwtService'
import storeDevice from '~/stores/StoreDevice'

const load = useload()

const desktopViewport = computed(() => storeDevice.viewport.desktop.value)
console.log('🚀 ~ desktopViewport:', desktopViewport)

function isVisible(elm: any) {
  const rect = elm.getBoundingClientRect()
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}

const animationScroll = () => {
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.paused').forEach(elm => {
      // que sean visibles...
      if (isVisible(elm)) {
        elm.classList.remove('paused')
      } // les quitamos la clase paused
    })
  })
}

const fetcher = async () =>
  await fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
    response.json(),
  )

const { data, suspense } = useQuery({ queryKey: ['test'], queryFn: fetcher })

await suspense()

definePageMeta({
  middleware: 'observer-nav',
  icon: 'mdi-home',
  title: 'home',
})

onMounted(async () => {
  setTimeout(() => {
    // mounted.value = true
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

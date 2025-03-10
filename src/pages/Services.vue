<!-- eslint-disable vue/max-len -->
<template>
  <div class="body">
    <main class="services">
      <!-- start banner -->
      <MainBanner
        :back-src="{
          imgSrc: '/backgrounds/header.png',
        }"
        :text-content="{
          title: 'Servicios',
          description: 'La tierra y los ladrillos siempre fueron y serán la mejor inversión',
        }"
        :style="{ height: '350px' }"
      />
      <!-- end banner -->
      <article class="services__services w-100">
        <global-background-src
          :blur="true"
          :background="'linear-gradient(to bottom, rgba(68,99,173,1) 0%, rgba(68,99,173,1) 53%, rgba(255,255,255,1) 53%, rgba(255,255,255,1) 100%);'"
        />

        <main-paragraph
          class="box container py-5"
          :styles="{
            alignItem: 'center',
            titleDirection: 'center',
            tilteTypeColor: 'binary',
          }"
          :title="{ h4: 'Amplias propiedades para todos los presupuestos' }"
          :is-title="true"
        />

        <div class="box container">
          <global-carousel
            :cards="infoServices"
            :type="'services'"
          />
        </div>
      </article>
      <global-partners />
    </main>
  </div>
</template>

<script lang="ts" setup>
const load = useload()
const mediaQueryXL = useMediaQueryXL()

const infoServices = useContentIconServices()

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

definePageMeta({
  middleware: 'observer-nav',
  icon: 'mdi-home',
  title: 'Servicios',
})

onMounted(async () => {
  // console.log('mounted', window.scroll)
  console.log('🚀 ~ mediaQueryXL:', mediaQueryXL.value)
  animationScroll()
  load.value = false
})

</script>
<style lang="scss" scoped>
@import "@/assets/scss/Home.scss";
</style>

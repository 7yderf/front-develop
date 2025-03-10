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
          title: 'Vendedores',
        }"
        :style="{ height: `${sellers.length > 0 ? '150px' : '250px'}` }"
      />
      <!-- end banner -->
      <article class="services__services w-100">
        <global-background-src
          :blur="true"
          :background="'linear-gradient(to bottom, rgba(68,99,173,1) 0%, rgba(68,99,173,1) 53%, rgba(255,255,255,1) 53%, rgba(255,255,255,1) 100%);'"
        />
        <main-paragraph
          v-if="!sellers.length"
          class="box container py-5"
          :styles="{
            alignItem: 'center',
            titleDirection: 'center',
            tilteTypeColor: 'binary',
          }"
          :title="{ h5: 'No hay vendedores o hubo un error en la consulta' }"
          :text="['Por favor, intenta más tarde']"
          :is-title="true"
        />
        <button
          v-if="sellers.length > 0"
          type="button"
          class="seller__btn-new"
          @click="toggleOffcanvas(0)"
        >
          Nuevo vendedor
        </button>
        <div
          v-if="sellers.length > 0"
          class="box container"
        >
          <global-carousel
            v-if="!load"
            :cards="sellers"
            :type="'vendors'"
            @off-canvas="toggleOffcanvas"
            @delete-seller-id="deleteSellerId"
          />
        </div>
      </article>
    </main>
    <div
      id="offcanvasRight"
      ref="offcanvasRight"
      class="offcanvas offcanvas-end"
      tabindex="-1"
      aria-labelledby="offcanvasRightLabel"
    >
      <filter-header-form-seller />
      <div class="offcanvas-body p-0">
        <sellers-form
          v-if="!reload"
          :method="method"
          @success="refreshWindow"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {
  fetchSellers, fetchSellerById, reset, deleteSeller,
} = useVendedores()

const load = useload()
const mediaQueryXL = useMediaQueryXL()
const sellers = ref<any[]>([])
const reload = ref(false)
const { $bootstrap } : any = useNuxtApp()
const offcanvasRight = ref<HTMLElement | string >('')
let offcanvas: any
const method = ref('POST')

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const toggleOffcanvas = async (id: any = 0) => {
  console.log('🚀 ~ toggleOffcanvas ~ id', id)
  if (id) {
    reload.value = true
    method.value = 'PUT'
    await fetchSellerById(id)
    reload.value = false
    offcanvas.toggle()
  } else {
    reset()
    reload.value = true
    method.value = 'POST'
    await sleep(100)
    reload.value = false
    offcanvas.toggle()
  }
}

const deleteSellerId = async (id: any) => {
  console.log('🚀 ~ deleteSeller ~ id', id)
  try {
    await deleteSeller(id)
    window.location.reload()
  } catch (error) {
    console.log('🚀 ~ deleteSeller ~ error', error)
  }
}

const refreshWindow = () => {
  window.location.reload()
}

definePageMeta({
  middleware: 'auth',
  icon: 'mdi-home',
  title: 'Vendedores',
})

onMounted(async () => {
  // console.log('mounted', window.scroll)
  const { sellersList }:any = await fetchSellers()
  sellers.value = sellersList.value || []
  load.value = false
  if (sellers.value.length > 0) {
    offcanvas = new $bootstrap.Offcanvas(offcanvasRight.value)
  }
})

</script>
<style lang="scss" scoped>
@import "@/assets/scss/Mixins";
@import "@/assets/scss/Home.scss";

.seller{
  &__btn-new{
    @include button(solid, 4px);
  }
}
</style>

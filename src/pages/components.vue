<!-- eslint-disable vue/max-len -->
<template>
  <div class="body">
    <main class="home">
      <MainBanner
        :back-src="{
          imgSrc: '/backgrounds/header.png',
        }"
        :text-content="{
          title: 'Excelencia en Servicios Inmobiliarios',
          description: 'Nuestra especialidad es en el sector comercial e industrial',
        }"
        :actions="[
          { text: 'Conoce la propiedad de tus sueños', to: '/about', type: 'initial' },
        ]"
        :from="from"
      />
      <article
        id="contact"
        class="home__contact"
      >
        <main-flex-box
          :class="`${from}__contact`"
          :styles="{
            gap: '0px',
            maxWidhtRight: '450px',
          }"
        >
          <template #left>
            <div class="">
              <h4>¿Por qué comprar una propiedad con nosotros?</h4>
            </div>
            <div class="box container">
              <global-icon-text
                v-for="(item, index) in contactCopy"
                :key="index"
                :class="`${from}__contact-item`"
                :title="item.title"
                :text="item.text"
                :img-src="item.imgSrc"
                :styles="{
                  gap: '16px',
                  justifyContent: 'flex-start',
                }"
              />
            </div>
          </template>
          <template #rigth>
            <div
              id="contact"
              class="home__contact-box--hero box position-relative"
            >
              <global-background-src
                :blur="true"
                :background="'#4464AD'"
                :from="from"
              />
              <h5>Encuentra la casa de tus sueños</h5>
            </div>
            <div class="home__contact-box--main box">
              <Contact />
            </div>
          </template>
        </main-flex-box>
      </article>
      <!--start about secion  -->
      <article>
        <global-background-src
          :blur="true"
          :background="'#FFFccc'"
        />
        <div class="box container">
          <h4 class="text-center">
            Somos una empresa reconocida y exitosa dentro del sector inmobiliario de noreste de México.
          </h4>
        </div>
        <main-flex-box
          :class="`${from}2__about`"
          :styles="{
            gap: '4%',
            maxWidhtleft: '50%',
          }"
        >
          <template #left>

            <global-background-src
              :img-src="'/backgrounds/nosotros.png'"
              :position="'top'"
            />
            <div class="about__decorate" />
          </template>
          <template #rigth>
            <h3>
              Sobre nosotros
            </h3>
            <p>
              Somos Grupo Torres Inmobiliario, iniciamos operaciones en junio del año 2015 como una Agencia originaria del Puerto de Ensenada.
            </p>
            <p>
              En junio del año 2018 abrimos la oficina en la ciudad de Tijuana, Baja California. Y en junio del año 2020 abrimos nuestra oficina en La ciudad de Los Mochis, Sinaloa.
            </p>
            <p>
              'Oficinas físicas disponibles para atención los 7 días de la Semana Agentes Profesionales Inmobiliarios en capacitación continua, con más de 20 cursos Especializados Anuales de actualización para nuestro Equipo.
            </p>
            <p>
              Miembros Activos de APIE (Asociación de Profesionales inmobiliarios de Ensenada) y AMPI (Asociación Mexicana de Profesionales Inmobiliarios) en la Ciudad de Ensenada, Tijuana, y Los Mochis. En alianza con más de 100 Agencias Inmobiliarias en la Ciudad de Ensenada y en la ciudad de Tijuana así como también más de 200 oficinas inmobiliarias, en el Estado de Baja California, ya que formamos parte del CEPIBC (Consejo Estatal de Profesionales Inmobiliarios).
            </p>
            <p>
              Trabajamos con Presencia en todo el País a través de nuestras redes sociales con AMPI NACIONAL Contamos con herramientas tecnológicas para apoyarnos de manera eficiente (CRM´s, Páginas Web, Fan page, Whats App Business, etc.)
            </p>
            <global-follow />
          </template>
        </main-flex-box>
        <div class=" box container">
          <h4 class="text-center">
            “Donde hay una empresa de éxito, alguien tomó alguna vez una decisión valiente”
          </h4>
          <p>
            En agosto del año 2016 SEDECO nos autoriza la Licencia Inmobiliaria con número ENS20160006. Terminando este año con muchos éxitos cerrando un gran ciclo e iniciamos nuevos proyectos en año el 2017. Así como también la incorporación a la mesa directiva de la Asociación de Profesionales Inmobiliarios de Ensenada con el cargo de Tesorera.
          </p>
          <p>
            En este año La Asociación de profesionales inmobiliarios de Ensenada nos brinda la oportunidad de Asociarnos como Empresa y formar parte de APIE.
          </p>
        </div>
      </article>
      <article class="w-100">
        <div class="box container py-5">
          <h4 class="text-center">Nuestros vendedores</h4>
          <h5 class="text-center">Te ayudamos a encontrar la propiedad perfecta para ti</h5>
        </div>
        <div class="box container">
          <global-carousel
            v-if="!load"
            :cards="sellers"
            type="sellers"
          />
        </div>
      </article>
      <article class="home__services w-100">
        <main-content-cards
          v-if="!load && mounted"
          :ubication="desktopViewport ? 'left' : 'center'"
          :width="{
            sizeCard: '250px',
            cards: 4,
            gap: '32px',
          }"
        >
          <template #hero>
            <h4>Propiedades destacadas</h4>
            <h5>Encuentra la propiedad que buscas</h5>
          </template>
          <template #content>
            <global-sellers-card
              v-for="(seller, index) in sellers"
              :key="index"
              :img="seller.img"
              :title="seller.name"
              :description="seller.description"
            />
          </template>
        </main-content-cards>
      </article>
      <!--end about secion  -->
      <global-partners />
    </main>
  </div>
</template>

<script lang="ts" setup>
// import { hasPermissionTo } from '@/utils/JwtService'
import storeDevice from '~/stores/StoreDevice'

const from = 'home'
// const { fullPath } = useRoute()

const load = useload()
const mounted = ref(false)
const desktopViewport = computed(() => storeDevice.viewport.desktop.value)

const contactCopy = [
  { title: 'Hacemos una casa tu hogar', text: 'Encontramos siempre el mejor trato para usted', imgSrc: '/icons/icon-contac-1.png' },
  // eslint-disable-next-line vue/max-len
  { title: 'Calidad garantizada', text: 'Nuestro crecimiento constante es el resultado del profesionalismo, capacitación y entusiasmo de nuestro equipo de trabajo', imgSrc: '/icons/icon-contac-2.png' },
  { title: 'Aceptamos créditos', text: 'Se aceptan diferentes tipos de créditos hipotecarios', imgSrc: '/icons/icon-contac-3.png' },
]

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
  title: 'home',
})

const { fetchVendedores } = useSellers()
const sellers = ref<any>([])

onMounted(async () => {
  // if (process.client) {
  //   hasPermissionTo('editar:profile')
  // }
  animationScroll()
  setTimeout(() => {
    mounted.value = true
  }, 100)

  const { sellersList }:any = await fetchVendedores()
  sellers.value = sellersList.value || []
  load.value = false
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

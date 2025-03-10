<script lang="ts" setup>
const load = useload()
const { tab } = useRoute().params
const isRezise = useSizeResponsive()
const isActive = useActiveTab()

const legalRoutes = [
  'aviso-privacidad',
  // 'terminos-condiciones',
  // 'politicas-garantias',
]

if (!legalRoutes.includes(tab)) {
  navigateTo('/legales/aviso-privacidad')
}

const LEGALES = {
  'aviso-privacidad': 'Aviso de privacidad',
  // 'terminos-condiciones': 'Términos y condiciones',
  // 'politicas-garantias': 'Políticas y garantías',
}
const AVISO = 'aviso-privacidad'
const TERMINOS = 'terminos-condiciones'
const POLITICAS = 'politicas-garantias'

const showTabs = () => {
  isActive.value = !isActive.value
}

watch(
  () => isRezise.value,
  value => {
    if (value) {
      isActive.value = false
    } else {
      isActive.value = true
    }
  },
)
onMounted(async () => {
  load.value = false
})
</script>
<template>
  <main class="products__main">
    <article class="container">
      <div class="row">
        <!-- <div
          class="col-md-3 col-sm-12 mr-2 legales-list"
          :data-background="isActive"
        >
          <h5
            class="mb-4 title-legales"
            style="margin-top: 4rem"
          >
            LEGALES
          </h5>
          <div
            class="d-flex"
            style="justify-content: space-between"
            @click="showTabs"
          >
            <p
              v-if="!isRezise"
              class="list-group-item list-group-item-action"
            >
              {{ LEGALES[tab] }}
              <icon
                :name="isActive ? 'ep:plus' : 'ep:minus'"
                class="icon-minus"
              />
            </p>
          </div>
          <Transition>
            <div
              v-if="!isActive"
              id="list-tab"
              class="list-group"
              role="tablist"
            >
              <NuxtLink
                :data-show="!isRezise && tab === AVISO"
                :to="`/legales/${AVISO}`"
                class="list-group-item list-group-item-action"
                :class="tab === AVISO ? 'active' : ''"
                @click="!isRezise && (isActive = !isActive)"
              >Aviso de privacidad
              </NuxtLink>
              <NuxtLink
                :data-show="!isRezise && tab === TERMINOS"
                :to="`/legales/${TERMINOS}`"
                class="list-group-item list-group-item-action"
                :class="tab === TERMINOS ? 'active' : ''"
                @click="!isRezise && (isActive = !isActive)"
              >Términos y condiciones</NuxtLink>
              <NuxtLink
                :data-show="!isRezise && tab === POLITICAS"
                :to="`/legales/${POLITICAS}`"
                class="list-group-item list-group-item-action"
                :class="tab === POLITICAS ? 'active' : ''"
                @click="!isRezise && (isActive = !isActive)"
              >Políticas y garantías</NuxtLink>
            </div>
          </Transition>
        </div> -->
        <div
          class="col-md-12 col-sm-12 mb-5"
          style="margin-top: 4rem"
        >
          <div
            id="nav-tabContent"
            class="tab-content"
          >
            <div
              class="tab-pane fade"
              :class="tab === AVISO ? 'show active' : ''"
            >
              <h4>AVISO DE CONFIDENCIALIDAD Y PRIVACIDAD DE LOS DATOS</h4>
              <p>La empresa  ´´GRUPO TORRES INMOBILARIO´´, con domicilio en calle OCTAVA Y GASTELUM #588 PLAZA LOZANO, ZONA CENTRO, DE ESTA CIUDAD, ENSENADA B.C, responsable de recabar, almacenar y administrar bajo su debida autorización (la cual para fines administrativos acepta al proporcionarnos sus datos) sus datos personales y/o sensibles y/o profesionales, tanto en lo selectivo, como en lo parcial y total, así pues del uso y protección de la misma el Demandante, Usuario, Visitante, Comprador, Interesado, proveedor en lo consiguiente denominado ¨El Usuario¨ que haga uso de los servicios ofertados por ¨GRUPO TORRES INMOBILIARIO¨ se compromete a dar lectura a este AVISO con la única finalidad de cumplir con lo dispuesto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
            </div>
            <div
              class="tab-pane fade"
              :class="tab === TERMINOS ? 'show active' : ''"
            >
              <h3>Términos y condiciones</h3>
              <p>...</p>
            </div>
            <div
              class="tab-pane fade"
              :class="tab === POLITICAS ? 'show active' : ''"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </article>
  </main>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/Mixins";
.products__main {
  min-height: calc(100vh - 417px);
}
.legales-list {
  &[data-background="true"] {
    background-color: #e8e8e8;
    transition-delay: 0.5s; /* Retardo de 1 segundo */
    padding-right: 22px;
  }
  &[data-background="false"] {
    //padding-right: 22px;
  }
}
.list-group {
  &[data-show="false"] {
    display: none;
  }
  &[data-active="true"] {
    display: block !important;
  }
}
.list-group-item {
  &[data-show="true"] {
    display: none;
  }
}
.list-group-item-action {
  border: none;
  border-radius: 0px;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  height: 48px;
  padding: 12px 16px 12px 0px;
}
.list-group-item-action.active {
  background-color: #fff;
  color: #000;
  border-right: solid 4px #2d679f;
}
.tab-content {
  padding-left: 4rem;
}
.tab-content p {
  margin: 24px 0px;
}
.legales-list {
  box-shadow: 4px 0px 4px -2px rgba(0, 0, 0, 0.25);
  padding-right: 0px;
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@media (max-width: 767px) {
  .tab-content {
    padding-left: 0rem;
  }
  .legales-list {
    box-shadow: none;
    border-bottom: 2px solid #e8e8e8;
    padding-right: 0px;
  }
  .title-legales {
    display: none;
  }
  .list-group-item-action.active {
    border-right: none;
  }
  .icon-minus {
    color: var(--text-color);
    margin: 0;
    width: 15px;
    position: absolute;
    right: 0;
  }
}
@media (max-width: 991px) {
  .list-group-item-action {
    height: auto;
  }
}
</style>

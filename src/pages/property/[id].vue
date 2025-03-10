<script lang="ts" setup>
const load = useload()
const { id } = useRoute().params

const { fetchPropertyById } = useBrokProperty()
const product : any = await fetchPropertyById(id.toString())

const products = computed(() => {
  if (product) {
    return product
  }
  return {}
})
console.log('🚀 ~ products.value:', products.value)

onMounted(async () => {
  setTimeout(() => {
    load.value = false
  }, 100)
})

const translateType: { [key: string]: string} = {
  rental: 'Renta',
  sale: 'Venta',
  temporary_rental: 'Renta Temporal',
}

const operationType = computed(() => {
  if (products.value.operations) {
    return translateType[products.value.operations[0]?.type] || null
  }
  return '' // Add a return statement here
})

definePageMeta({
  middleware: 'observer-nav',
  icon: 'mdi-home',
  title: 'Detalle de propiedad',
})

</script>
<template>
  <main
    v-if="JSON.stringify(product) !== '{}'"
    class="detail"
  >
    <article>
      <section class="container">
        <div class="detail__title">
          <main-paragraph
            :styles="{
              alignItem: 'flex-start',
            }"
            :title="{ h4: products.title }"
            :from="from"
          />
          <div class="detail__more-info">
            <div class="detail__types">
              <p
                v-if="operationType"
                class="operationType"
              >
                {{ operationType }}
              </p>
              <p
                v-if="products.property_type"
                class="propertyType"
              >
                {{ products.property_type }}
              </p>
            </div>
            <div class="detail__prices">
              <p>
                {{ products.operations[0]?.formatted_amount }}
              </p>
              <p>
                {{ products.operations[0]?.currency }}
              </p>
            </div>
          </div>
        </div>
        <div class="box">
          <global-detail-property
            :property="products"
          />
        </div>
      </section>
    </article>
    <article class="py-5">
      <main-paragraph
        :styles="{
          titleDirection: 'center',
        }"
        :title="{ h4: 'Descripción y ubicación' }"
        :is-title="true"
      />
    </article>
    <article class="detail__body-box container">
      <section class="container detail__map">
        <div class="box detail__map-box-description">
          <p v-html="products.description" />
        </div>
        <div class="box detail__map-box">
          <iframe
            class="detail__map-iframe box"
            title="map"
            height="400"
            :src="`https://maps.google.com/maps?q=${products.location?.latitude},${products.location?.longitude}&hl=es;z=14&amp;output=embed`"
          />
          <div class="box detail__map-direction">
            <global-icon-text
              :class="'detail__map-direction-icon'"
              :icon="'ri:map-pin-2-fill'"
              title="Dirección del inmueble"
              :text="products.location?.name"
            />
            <main-paragraph
              :styles="{
                titleDirection: 'left',
              }"
              :title="{ h5: 'Contacta a tu asesor' }"
            />
            <global-icon-text
              :class="'detail__map-direction-icon'"
              :icon="'ri:user-2-fill'"
              title=""
              :text="products.agent?.name"
            />
            <global-icon-text
              :class="'detail__map-direction-icon'"
              :icon="'ri:mail-fill'"
              title="Correo electrónico"
              :text="products.agent?.email"
            />
            <global-icon-text
              :class="'detail__map-direction-icon'"
              :icon="'ri:phone-fill'"
              title="Teléfono"
              :text="products.agent?.mobile_phone"
            />
          </div>
        </div>
      </section>
      <aside class="detail__aside">
        <div class="home__contact-box--hero box position-relative">
          <global-background-src
            :blur="true"
            :background="'#4464AD'"
            :from="from"
          />
          <main-paragraph
            :styles="{
              tilteTypeColor: 'binary',
            }"
            :title="{ h5: '¿Te interesa esta propiedad?' }"
            :from="from"
          />
        </div>
        <div class="home__contact-box--main box">
          <Contact
            :property-url="products.public_url"
          />
        </div>
      </aside>
    </article>

  </main>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/DetailProperty.scss";
</style>

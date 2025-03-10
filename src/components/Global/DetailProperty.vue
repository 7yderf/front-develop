<!-- eslint-disable vue/no-v-html -->
<template>

  <div
    class="property"
  >
    <div class="slide">
      <global-galery-detail
        :images="property.property_images || []"
      />
    </div>
    <div class="property__main">
      <main-paragraph
        :title="{ h4: 'Información general' }"
      />
      <div class="property__description-html">
        <global-icon-text
          v-if="property?.bedrooms"
          :class="'property__attribute'"
          :icon="'ri:home-2-fill'"
          :title="'Recamaras'"
          :text="`${property.bedrooms}`"
        />
        <global-icon-text
          v-if="property?.bathrooms"
          :class="'property__attribute'"
          :icon="'fluent-emoji-high-contrast:womens-room'"
          :title="'Baños'"
          :text="`${property.bathrooms}`"
        />
        <global-icon-text
          v-if="property?.half_bathrooms"
          :class="'property__attribute'"
          :icon="'fluent-emoji-high-contrast:toilet'"
          :title="'Medios Baños'"
          :text="`${property.half_bathrooms}`"
        />
        <global-icon-text
          v-if="property?.parking_spaces"
          :class="'property__attribute'"
          :icon="'fluent-emoji-high-contrast:automobile'"
          :title="'Estacionamientos'"
          :text="`${property.parking_spaces}`"
        />
        <global-icon-text
          v-if="property?.lot_size"
          :class="'property__attribute'"
          :icon="'fluent-emoji-high-contrast:blue-square'"
          :title="'M2 de terreno'"
          :text="`${property.lot_size} M2`"
        />
        <global-icon-text
          v-if="property?.construction_size"
          :class="'property__attribute'"
          :icon="'fluent-emoji-high-contrast:brick'"
          :title="'M2 de construcción'"
          :text="`${property.construction_size} M2`"
        />
      </div>
      <div
        v-if="property?.features && property.features.length > 0"
        class="property__box-feature"
      >
        <main-paragraph
          :class="'w-100 my-3'"
          :styles="{
            titleDirection: 'left',
            alignItem: 'flex-start',
          }"
          :title="{ h4: 'Caracteristicas' }"
        />
        <global-icon-text
          v-for="(feature, index) in property?.features || []"
          :key="index"
          :class="'property__feature'"
          :icon="'mdi:check-underline'"
          :title="feature.name"
          :text="feature.category"
        />
      </div>

    </div>
  </div>

</template>

<script lang="ts" setup>
defineProps<{
  property: {
    photos: []
  } | any;
}>()

// limirar el numero de caracteres de la descripcion
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Mixins";
.slide{
  width: 50%;
  padding: 16px;
}
.property {
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 3px 16px 110px 0px rgba(0, 0, 0, 0.17);
  width: 100%;
  margin-top: 24px;
  padding: 24px 0px;
  &__main{
    @include flex(flex-start, 8px, flex-start);
    flex-direction: column;
    padding: 16px;
    flex-grow: 1;
    h6{
      font-weight: 700;
      font-size: 1.6rem;
    }
  }
  &__description-html{
    @include flex(center, 16px, center);
    flex-wrap: wrap;
    width: 100%;
    flex-grow: 1;
    padding-top: 16px;
    position: relative;
    padding: 24px 0px;
  }
  &__attribute{
    @include border(var(--primary-color));
    gap: 4px;
    padding:8px;
    @include for-size(phone-xbig) {
      width: 100%;
      justify-content: flex-start;
    }
  }
  &__box-feature{
    @include flex(flex-start, 8px 0px, flex-start);
    flex-wrap: wrap;
  }
  &__feature{
    @include flex(flex-start, 4px, flex-start);
    width: 50%;
    @include for-size(phone-xbig) {
      width: 100%;
    }
  }
  &__location{
    @include text(1.4rem, 600, 1.8rem);
    color: #293831c4;
  }
  &__type{
    font-size: 32px;
    font-weight: 700;
    color: #29383138;
  }
  &__prices{
    @include flex(flex-end, 4px, flex-end);
    width: 100%;
    p{
      font-weight: 600;
      color: #293831c4;
    }
  }

  @include for-size(tablet-landscape) {
    flex-direction: column;
    width: 100%;
    .slide{
      width: 100%;
    }
  }
}

</style>

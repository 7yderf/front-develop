<script lang="ts" setup>

const data = [
  { imgSrc: '/icons/infonavit.png' },
  { imgSrc: '/icons/banjercito.png' },
  { imgSrc: '/icons/foviste.png' },
  { imgSrc: '/icons/sociedad.png' },
  { imgSrc: '/icons/creditos.png' },
]

const from = 'partners'

</script>
<template>

  <article
    class="partners w-100"
  >
    <global-background-src
      :blur="true"
      :background="'#FFF'"
    />
    <h4 class="m-auto">Manejamos varios tipos de Créditos</h4>
    <div class="box partners__box w-100">
      <global-icon-text
        v-for="(item, index) in data"
        :key="index"
        :class="`${from}__item`"
        :img-src="item.imgSrc"
      />
    </div>
  </article>

</template>

<style lang="scss" scoped>
@import "@/assets/scss/Mixins";

.partners{
  padding: 72px 16px 72px;
  &__box{
    @include flex;
    margin-top: 40px;
  }

}

</style>

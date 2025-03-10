<script lang="ts" setup>

defineProps<{
  id: string | number,
  img: string,
  title: string,
  description: Array<{
    description_title: string,
    description_text: string
  }>
}>()

const from: string = 'sellers'

const emits = defineEmits(['offCanvas', 'deleteSellerId'])

const toggleOffcanvas = (id:any) => {
  emits('offCanvas', id)
}
const deleteSeller = (id:any) => {
  emits('deleteSellerId', id)
}

</script>
<template>
  <div class="box ">
    <div class="v-card">
      <div class="v-card__hover-description">
        <div class="box container v-card__description-text">

          <global-icon-text
            v-for="(info, index) in description"
            :key="index"
            :class="`${from}__item`"
            :title="info?.description_title"
            :link="{
              to: `tel:${info?.description_text}`,
              text: info?.description_text,
              target: '',
            }"
            :styles="{
              textTypeColor: 'binary',
              justifyContent: 'left',
            }"
          />

        </div>
      </div>
      <global-background-src
        :img-src="`https://www.grupotorresinmobiliario.com/back${img}`"
      />
    </div>
    <main-paragraph
      class="v-card__title mt-4"
      :class="`${from}__title`"
      :title="{ h6: title }"
    />
    <div class="v-card__actions">
      <button
        class="v-card__actions-edit"
        type="button"
        @click="toggleOffcanvas(id)"
      > Editar</button>
      <button
        class="v-card__actions-remove"
        type="button"
        @click="deleteSeller(id)"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/Mixins";
.box{
  max-width: 250px;
}
.v-card{
  //@include border;
  $root: &;
  @include flex(flex-start, 10px, flex-end);
  position: relative;
  padding: 16px;
  border-radius: 12px;
  overflow: hidden;
  transition: 0.5s;
  width: 250px;
  height: 350px;
  //box-shadow: 3px 16px 110px 0px rgba(0, 0, 0, 0.17);
  &__title{
    transition: 0.5s;
    z-index: 1;
  }
  &__hover-description{
    @include flex(flex-start, 10px, flex-end);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 16px;
    transform: translateY(60%);
    background-color: rgba(89, 131, 252, 0);
    background: linear-gradient(to bottom, rgba(246,246,246,0) 0%, rgba(68,99,173,1) 100%);
    transition: 0.5s;
    z-index: 0;
  }
  &__description-text{
    opacity: 0;
    transition: 0.5s;
  }
  &__actions{
    @include flex(center, 8px, center)
  }
  &__actions-edit{
    @include button(solid, 4px);
  }
  &__actions-remove{
    @include button(outline, 4px);
    border: 1px solid #d00d31;
    background: var(--neutral-0, #d00d31);
    &:hover{
      background: #ec1c42!important;
      border: 1px solid #ec1c42!important;
    }
  }
  &:hover{
    #{$root}__title{
      transition: .5s;
      opacity: 0;
      z-index: 0;
    }
    #{$root}__hover-description{
      transform: translateY(0%);
      z-index: 1;
      #{$root}__description-text{
        opacity: 1;
      }
    }
  }
}

</style>

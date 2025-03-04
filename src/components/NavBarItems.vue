<template>
  <div
    id="navbarNav"
    class="collapse navbar-collapse nav-menu__collapse d-flex align-items-center justify-content-strech"
    :class="isOpen ? 'nav-menu__mobile-content' : ''"
    :data-active="isOpen"
  >
    <ul
      class="navbar-nav d-flex  flex-grow-1 gap-4"
      :class="isOpen ? 'nav-menu__mobile-content--box container' : 'justify-content-end'"
    >
      <p
        v-if="isMounted"
        class="nav-menu__title"
        :data-active="tabletSmallViewport"
      >
        Menu
      </p>
      <li
        class="nav-item"
      ><NuxtLink
        class="nav-link"
        :data-active="isOpen"
        to="/"
        @click="emits('close')"
      >
        Inicio
      </NuxtLink></li>
      <!-- <li
        class="nav-item"
      ><NuxtLink
        class="nav-link"
        :data-active="isOpen"
        to="/about"
        @click="emits('close')"
      >
        Nosotros
      </NuxtLink></li>
      <li
        class="nav-item"
      ><NuxtLink
        class="nav-link"
        :data-active="isOpen"
        to="/services"
        @click="emits('close')"
      >
        Servicios
      </NuxtLink></li> -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isOpen: Boolean,
  isMounted: Boolean,
  tabletSmallViewport: Boolean,
})
const emits = defineEmits(['close'])
</script>

<style scoped lang="scss">
// variables
</style>

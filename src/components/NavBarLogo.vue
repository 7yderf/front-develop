<template>
  <NuxtLink
    class="nav-link navbar-brand"
    :class="{ active: active }"
    to="/"
  >
    <img
      src="@/assets/images/logo_grupo_torres.png"
      alt="Grupo Torres Inmobiliario"
      class="logo-header"
    />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  active: Boolean,
})
</script>
<style scoped lang="scss">
// Variables
</style>

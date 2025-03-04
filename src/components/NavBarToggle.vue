<template>
  <button
    class="navbar-toggler nav-menu__toggler ml-0 txt"
    type="button"
    @click="$emit('toggle')"
  >
    <icon
      name="pajamas:hamburger"
      class="nav-menu__icon ms-0 "
    />
  </button>

  <button
    class="navbar-toggler nav-menu__toggler nav-menu__mobile"
    :data-active="isOpen"
    type="button"
    @click="emits('toggle')"
  >
    <icon
      name="ri:close-circle-fill"
      class="nav-menu__icon"
    />
  </button>

</template>

<script lang="ts" setup>

defineProps({
  isOpen: Boolean,
})
const emits = defineEmits(['toggle'])

</script>

<style lang="scss">

// Variables

</style>

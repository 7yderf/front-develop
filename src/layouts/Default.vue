<!-- eslint-disable vue/no-multiple-template-root -->
<template>

  <Navbar />

  <div
    class="container-fluid g-0"
    :class="params.id ? '' : 'overflow' "
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { params } = useRoute()

onMounted(async () => {})

</script>
<style lang="scss" scoped>
    .overflow {
        overflow-x: hidden;
        height: 100%;
    }
</style>

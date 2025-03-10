<script lang="ts" setup>

export interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Nuevo vendedor',
})

const closeDrawer = useCloseDrawer()
const setParams = useSetFilters()
// const router = useRouter()
const closeFilterParams = () => {
  closeDrawer.value = !closeDrawer.value
}
const setFilterParams = () => {
  setParams.value = !setParams.value
}
</script>
<template>
  <section class="drawer offcanvas-header">
    <header class="drawer__header">
      <h5>{{ title }}</h5>
      <button
        type="button"
        class="drawer__btn-filter"
        @click="setFilterParams"
      >
        <icon
          name="pajamas:clear-all"
          class="drawer__btn-icon"
        />
        <span class="drawer__filter-text drawer__btn-filter--txt-filter">Cancelar</span>
      </button>
    </header>
    <button
      type="button"
      class="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
      @click="closeFilterParams"
    />
  </section>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/form/header";

</style>

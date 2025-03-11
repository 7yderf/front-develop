<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>

  <div
    v-if="load"
    :disabled="false"
    class="loader__body"
  >
    <span class="loader" />
  </div>

  <nav
    :data-nav-show="tabletSmallViewport && hideNav"
    class="navbar navbar-expand-md nav-menu nav-menu__mobile-content"
  >
    <div
      :class="tabletSmallViewport ? 'container' : 'container-fluid'"
      :data-toggle="toggler"
    >
      <NavBarLogo />
      <NavBarToggle
        :is-open="toggler"
        @toggle="toggleNav"
      />
      <NavBarItems
        :is-open="toggler"
        :is-mounted="mounted"
        :tablet-small-viewport="tabletSmallViewport"
        @close="closeNav"
      />
      <div class="nav-menu__box-icon">
        <icon
          name="ri:search-2-line"
          class="nav-menu__icon"
        />
        <icon
          name="ri:shopping-cart-2-fill"
          class="nav-menu__icon"
        />
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import storeDevice from '~/stores/StoreDevice'

const load = useload()
const { toggler, hideNav, mounted } = useNav()

const tabletSmallViewport = computed(() => storeDevice.viewport.tabletSmall.value)

const toggleNav = () => {
  toggler.value = !toggler.value
}
const closeNav = () => {
  toggler.value = false
}

onMounted(async () => {
  storeDevice.useMediaQuery('tabletSmall')
  storeDevice.useMediaQuery('desktop')

  watch(
    () => tabletSmallViewport.value,
    value => {
      if (value) {
        console.log('🚀 ~ onMounted ~ value:', value)
        toggler.value = false
      }
    },
  )
  mounted.value = true
})
</script>
<style lang="scss">
@import "@/assets/scss/navbar";
@import "@/assets/scss/loader";
</style>

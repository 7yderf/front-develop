// composables/useNav.ts

export default function useNav() {
  const toggler = ref(false)
  const hideNav = ref(false)
  const mounted = ref(false)

  const scrollNavBottomHide = () => {
    let prevScrollPos = window.pageYOffset
    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset
      const scrollHeight = window.pageYOffset
      if (scrollHeight > 116) {
        hideNav.value = currentScrollPos > prevScrollPos
      } else {
        hideNav.value = false
      }
      prevScrollPos = currentScrollPos
    })
  }

  onMounted(() => scrollNavBottomHide())

  return { toggler, hideNav, mounted }
}

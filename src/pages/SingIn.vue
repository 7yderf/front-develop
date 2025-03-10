<!-- eslint-disable vue/max-len -->
<template>
  <div class="body">
    <main class="services">
      <MainBanner
        :back-src="{
          imgSrc: '/backgrounds/header.png',
        }"
        :text-content="{
          title: 'Bienvenido',
          description: 'Inicia sesión para continuar',
        }"
        :style="{ height: '200px' }"
      />
      <div class="form">
        <VForm
          class="form__container form__container--login"
          :validation-schema="schema"
          :initial-values="formValues"
          @submit="onSubmit"
        >
          <div class="form__box form__box--mobile">
            <FormVTextInput
              type="mail"
              name="email"
              label=""
              placeholder="Email"
              icon="/icon/sms.svg"
              :is-font-black="true"
            />
            <FormVTextInput
              type="text"
              name="password"
              label=""
              placeholder="Contraseña"
              icon="/icon/profile-circle.svg"
              :is-font-black="true"
            />
          </div>
          <div
            class="form__submit"
            type="submit"
          >
            <button
              type="submit"
              class="form__submit-btn"
            >
              Entrar
            </button>
          </div>
        </VForm>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'

const authStore = useAuthStore()

const load = useload()
const mediaQueryXL = useMediaQueryXL()

const formValues = reactive({
  email: '',
  password: '',
})

const schema = yup.object().shape({
  email: yup.string().email('El formato no es valido').required('El email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
})
const error = ref<any>(null)
const router = useRouter()
definePageMeta({
  middleware: 'observer-nav',
  icon: 'mdi-home',
  title: 'Login',
})

const onSubmit = async (values: any, { resetForm }) => {
  console.log('🚀 ~ onSubmit ~ values:', values)
  try {
    await authStore.login(values)
    router.push('/admin/vendedores')
  } catch (err: any) {
    error.value = err.message || 'Error al iniciar sesión'
  }
}

onMounted(async () => {
  // console.log('mounted', window.scroll)
  console.log('🚀 ~ mediaQueryXL:', mediaQueryXL.value)
  load.value = false
})

</script>
<style lang="scss" scoped>
@import "@/assets/scss/Home.scss";
@import "@/assets/scss/Mixins";
.form{
  width: 100%;
  &__submit{
    width: 100%;
    margin-bottom: 48px;
    padding: 16px;
}
&__container{
  &--login{
    @include border(#ccc);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 100%;
    max-width: 450px;
    margin: 50px auto;
  }

}
&__submit-btn{
  @include button(solid, 8px);
  max-width: inherit;
  width: 100%;
  margin: auto;
  margin-top: 16px;
  padding: 16px 32px;
  background: var(--text-color);
}
}
</style>

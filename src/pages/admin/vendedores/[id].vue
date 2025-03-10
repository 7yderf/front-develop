<!-- eslint-disable vue/max-len -->
<template>
  <div class="form">
    <VForm
      class="form__container"
      :validation-schema="schema"
      :initial-values="formValues"
      @submit="onSubmit"
    >
      <div class="form__box form__box--mobile">

        <FormVDropZoneInput
          name="img"
          label="Imagen"
          :accept="'.png, .jpg, .jpeg, .svg'"
          :is-font-black="true"
        />
        <FormVTextInput
          type="text"
          name="title"
          label=""
          placeholder="Nombre"
          icon="/icon/sms.svg"
          :is-font-black="true"
        />
        <FormVTextInput
          type="text"
          name="position"
          label=""
          placeholder="Puesto"
          icon="/icon/profile-circle.svg"
          :is-font-black="true"
        />
        <FormVTextInput
          type="text"
          name="telephone"
          label=""
          placeholder="Teléfono"
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
          Enviar
        </button>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'

const authStore = useAuthStore()

const load = useload()
const mediaQueryXL = useMediaQueryXL()

const formValues = reactive({
  img: '',
  title: '',
  position: '',
  telephone: '',
})

const schema = yup.object().shape({

})
const error = ref<any>(null)
const router = useRouter()

definePageMeta({
  middleware: 'auth',
  icon: 'mdi-home',
  title: 'Vendedores',
})

const onSubmit = async (values: any, { resetForm }) => {
  console.log('🚀 ~ onSubmit ~ values:', values)
  // enviar mediante formdata
  const formData = new FormData()
  formData.append('img', values.img)
  formData.append('title', values.title)
  const description = [
    {
      title: values.position,
      text: '',
    },
    {
      title: 'Teléfono',
      text: values.telephone,
    },
  ]
  formData.append('description', JSON.stringify(description))

  try {
    const response = await fetch('http://localhost:8080/seller/', {
      method: 'POST',
      body: formData,
    })
    console.log('🚀 ~ onSubmit ~ response:', response)
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
@import "@/assets/scss/Home.scss"
</style>

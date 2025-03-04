<!-- eslint-disable vue/max-len -->
<template>
  <div class="form">
    <VForm
      ref="form"
      class="form__container p-3"
      :validation-schema="schema"
      :initial-values="formValues"
      @submit="onSubmit"
    >
      <div class="form__box form__box--mobile">

        <FormVDropZoneInput
          name="img"
          label="Imagen"
          :accept="'.png, .jpg, .jpeg'"
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
          Guardar
        </button>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
// eslint-disable-next-line import/extensions
import { useSellerStore } from '@/stores/SellersStore'
import { storeToRefs } from 'pinia'

const setParams = useSetFilters()
interface Props {
  method: string
}

const emits = defineEmits(['success'])

const props = defineProps<Props>()

const cleanInfo = ref(false)
const { postSeller } = useVendedores()
const form = ref<any>(null)

const store = useSellerStore()
const { seller } = storeToRefs(store)

const formValues = ref(seller.value)
const closeDrawer = useCloseDrawer()

const schemaValidate = ({ method }:any) => yup.object().shape({
  img: yup.mixed().test('isRequired', 'La imagen es requerida', value => {
    if (method === 'PUT') {
      return true // Si es "put", no es requerida (validación pasa).
    }
    return !!value && (method === 'POST')
  }),
  title: yup.string().required('El nombre es requerido'),
  position: yup.string().required('El puesto es requerido'),
  telephone: yup.string().test(
    'len',
    'Debe tener exactamente 10 dígitos o estar vacío',
    val => !val || val.length === 10,
  )
    .notRequired(),
})

const schema = ref(markRaw(schemaValidate({ method: props.method })))
const error = ref<any>(null)

const onSubmit = async (values: any, { resetForm }: any) => {
  const { id, ...res } = values
  // eslint-disable-next-line no-param-reassign
  values = res

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
    await postSeller(formData, id)
    resetForm()
    closeDrawer.value = !closeDrawer.value
    emits('success')
  } catch (err: any) {
    error.value = err.message || 'Error al iniciar sesión'
  }
}

watch(
  () => setParams.value,
  () => {
    cleanInfo.value = !cleanInfo.value
    form.value?.resetForm()
  },
)

onMounted(async () => {
})

</script>
<style lang="scss" scoped>
@import "@/assets/scss/Home.scss";
@import "@/assets/scss/Mixins";
.form{
  &__submit{
    width: 100%;
    margin-bottom: 48px;
    padding: 16px;
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

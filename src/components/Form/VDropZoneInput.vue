<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div
    class="field field--dropzone"
    :data-type="data"
  >

    <div
      ref="dropzoneRef"
      class="input input__box"
      :data-focus="isFocused"
      :data-error="isError"
      :data-empty="isEmpty"
      :class="'dropzone'"
    >
      <!-- <FieldLabel
        :label="label"
        :data="data"
        :data-focus="isFocused || !isEmpty"
        :form-name="formName"
      /> -->

      <VField
        :id="`${label}-${formName}`"
        v-slot="{ meta, errors }"
        v-model="fieldValue"
        :name="name"
        type="file"
        class="input__input dropzone-form"
        :multiple="multiple"
        :accept="accept"
      >
        <div
          v-if="!fieldValue"
          class="dropzone-placeholder"
          @click="triggerDropzone"
        >
          <!-- <Icon
            icon="tabler:cloud-upload"
            width="2rem"
            height="2rem"
          /> -->
          <h6>Arrastra tu archivo aquí</h6>
          <p>o <span class="dropzone-select">seleccionar tu archivo</span></p>
          <p><small>.jpg, .png </small></p>
          <small>.2mb máx.</small>

        </div>
        <p
          v-if="!meta.valid && meta.touched"
          class="input__text-danger"
        >
          {{ errors[0] }}
        </p>
      </VField>
    </div>
  </div>
</template>

<script setup>
import 'dropzone/dist/dropzone.css'

// import FieldLabel from './FieldLabel.vue'

const props = defineProps({
  formName: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  reset: {
    type: Boolean,
    default: false,
  },
  submitValidate: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false, // Permitir la selección de múltiples archivos si es necesario
  },
  accept: {
    type: String,
    default: '', // Define qué tipos de archivos se pueden seleccionar
  },
})

const dropzoneRef = ref(null)
const dropzone = ref(null)
const fieldValue = ref(null)
const isFocused = ref(false)
const isEmpty = ref(true)
const isError = ref(false)

const selectedFiles = ref([])

const triggerDropzone = () => {
  dropzoneRef.value.click()
}

// const listenerValue = val => {
//   isEmpty.value = !val
//   return !val
// }

onMounted(async () => {
  if (process.client) {
    const { default: Dropzone } = await import('dropzone') // Aquí está el cambio
    Dropzone.autoDiscover = false

    dropzone.value = new Dropzone(dropzoneRef.value, {
      url: '/upload', // Cambiar esta URL al endpoint de tu API
      autoProcessQueue: false,
      addRemoveLinks: true,
      dictDefaultMessage: '',
      thumbnailWidth: null, // Mantener el ancho original
      thumbnailHeight: null, // Mantener la altura original
      acceptedFiles: props.accept,
      dictInvalidFileType: 'No puedes subir archivos de este tipo. Solo se permiten imágenes en formato PNG, JPG y JPEG.',
      maxFiles: 1,
      init() {
        this.on('addedfile', file => {
          selectedFiles.value.push(file)
          // eslint-disable-next-line prefer-destructuring
          fieldValue.value = selectedFiles.value[0]
          isEmpty.value = false
        })
        // Añadir lógica para manejar la eliminación de archivos
        this.on('removedfile', () => {
        // eslint-disable-next-line no-unused-expressions
          selectedFiles.value.length >= 2
            ? (selectedFiles.value = [selectedFiles.value[0]])
            : (selectedFiles.value = [])

          fieldValue.value = selectedFiles.value.length ? selectedFiles.value[0] : null
          isEmpty.value = true
        })
        // Si ya hay un archivo cargado, eliminar el archivo nuevo que exceda el límite
        this.on('maxfilesexceeded', file => {
          this.removeFile(file) // Elimina el nuevo archivo automáticamente
        })
        // Manejar archivos de tipo no permitido
        this.on('error', (file, errorMessage) => {
          if (errorMessage === this.options.dictInvalidFileType) {
            this.removeFile(file) // Elimina el archivo no permitido
          }
        })
      },
    })
  }

  watch(() => props.reset, () => {
    dropzone.value.removeAllFiles()
    fieldValue.value = null
  })
})
</script>

<style lang="scss">
@import "@/assets/scss/Input.scss";

/* Estilos personalizados para Dropzone */
.dropzone {
  text-align: center;
  cursor: pointer;
  height: 180px;
  //&:hover {
    //border:1px solid #005099!important;
  //}
}

.dropzone-placeholder {
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropzone-select{
  color: #339FFF;
  cursor: pointer;
}
.dz{
  &-image-preview{
    display: flex!important;
    flex-direction: column!important;
    align-items: center!important;
    background: transparent!important;
  }
  &-image{
    display: flex!important;
    object-fit: contain!important;
    width: auto!important;
  }
  &-details{
    position: relative!important;
    top: inherit!important;
    opacity: 1!important;
    padding: 0!important;
    line-height: 150%!important;
  }
  &-size{
    margin-top: .3rem!important;
    margin-bottom: .5rem!important;
    font-size: 1rem!important;
  }
  &-progress{
    display: none!important;
  }
}
</style>

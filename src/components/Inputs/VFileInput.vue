<template>
  <div
    class="field"
    :data-Type="data"
  >
    <div class="field__box-file position-relative  ">
      <div
        class="input input__box"
        :data-Type="data"
        :data-focus="isFocused"
        :data-error="isError"
        :data-readOnly="readonly"
        @@click.stop="(e) => triggerFileInput(e)"
      >
        <FieldLabel
          :label="label"
          :data="data"
          :data-focus="isFocused || !isEmpty"
          :form-name="formName"
          :data-height="height"
          :data-withIcon="!!icon"
        />
        <span class="input__bullet">
          <icon
            v-if="!!icon"
            :name="icon"
            width="1.4rem"
            height="1.4rem"
          />
        </span>
        <VField
          :id="`${label}-${formName}`"
          ref="fileInput"
          v-model="selectedFile"
          :name="name"
          type="file"
          class="input__input"
          :data-height="height"
          :multiple="multiple"
          :accept="accept"
          @focus="onFocus"
          @blur="onBlur"
          @change="onFileChange"
        />
        <span class="input__bullet input__bullet--pointer">
          <icon
            name="tabler:paperclip"
            width="1.4rem"
            height="1.4rem"
            @click.stop="(e) => triggerFileInput(e)"
          />
        </span>
        <!-- Mostrar el nombre del archivo seleccionado -->
      </div>
      <div
        v-if="selectedFiles.length > 0"
        class="file-list"
      >
        <div
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="file-item"
        >
          {{ file.name }}
        </div>
        <icon
          name="ic:round-close"
          @click="clearInput"
        />
      </div>
    </div>

    <VErrorMessage
      :name="name"
      class="input__text-danger"
    />
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  formName: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'file', // Para este componente siempre será 'file'
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  data: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false, // Permitir la selección de múltiples archivos si es necesario
  },
  accept: {
    type: String,
    default: '', // Define qué tipos de archivos se pueden seleccionar
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: 'medium',
  },
  reset: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['filesSelected'])

const isFocused = ref(false)
const isEmpty = ref(true)
const isError = ref(false)
const selectedFiles = ref<File[]>([])
const selectedFile = ref(null)
const fileInput = ref(null)
// Eventos de enfoque y desenfoque
const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
}

const clearInput = () => {
  const input = document.getElementById(`${props.label}-${props.formName}`) as HTMLInputElement
  if (input) {
    input.value = '' // Limpiar el valor del input manualmente
  }
  selectedFiles.value = []
  selectedFile.value = null
  isFocused.value = false
  isEmpty.value = true
  emit('filesSelected', selectedFiles.value)
}

// Manejar la selección de archivos
const onFileChange = (event: any) => {
  const { files } = event.target
  selectedFiles.value = Array.from(files)
  emit('filesSelected', selectedFiles.value)
  isEmpty.value = files.length === 0
}

watch(() => props.reset, value => {
  if (value) {
    clearInput()
  }
})

const triggerFileInput = (event: any) => {
  event.stopPropagation() // Detener la propagación
  const input = document.getElementById(`${props.label}-${props.formName}`)
  if (input) {
    input.click() // Abrir el diálogo de archivo
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/Inputs/Input.scss";

.input__input{
  visibility: hidden;
}

.file-list {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 40px;
  z-index: 3;
  .file-item {
    margin-bottom: 0.2rem;
  }
}
</style>

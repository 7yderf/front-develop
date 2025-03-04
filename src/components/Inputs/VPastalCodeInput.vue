<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div
    class="field"
    :data-Type="data"
  >
    <div
      class="input input__box"
      :data-Type="data"
      :data-focus="isFocused"
      :data-error="isError"
      :data-empty="isEmpty"
      :data-readOnly="readonly"
    >
      <FieldLabel
        :label="label"
        :data="data"
        :data-focus="isFocused || !isEmpty"
        :form-name="formName"
        :data-height="height"
        :data-withname="!!icon"
      />

      <span
        class="input__bullet"
      >
        <Icon
          v-if="!!icon"
          :name="icon"
          width="1.4rem"
          height="1.4rem"
        />
      </span>

      <VField
        v-slot="{ field, meta, value }"
        :name="name"
      >
        <input
          v-bind="field"
          :id="`${label}-${formName}`"
          class="input__input"
          :data-height="height"
          :class="{
            'is-success': meta.valid && meta.touched,
            'is-danger': !meta.valid && meta.touched,
          }"
          :placeholder="placeholder"
          :type="type"
          :readonly="readonly"
          :value="value ? `${value}`?.replace(/\D/g, '') : value"
          :autocomplete="type === 'password' ? 'new-password' : 'true'"
          @focus="onFocus()"
          @blur="onBlur()"
          @input="validateAndEmit($event.target?.value || '')"
        />
        <span
          v-if="!readonly"
          class="d-flex"
        >
          <span
            v-if="password && (type === 'text')"
            class="input__hide-pass"
            @click="showPassword('hide', name)"
          >
            <Icon
              name="iconamoon:eye-off-thin"
              width="1.5rem"
              height="1.5rem"
              style="color: black"
            />
          </span>
          <span
            v-if="password && (type === 'password')"
            class="input__show-pass"
            @click="showPassword('show', name)"
          >
            <Icon
              name="ph:eye-thin"
              width="1.5rem"
              height="1.5rem"
              style="color: black"
            />
          </span>
        </span>
        <span :data-listener="listenerValue(value)" />
      </VField>
    </div>
    <VErrorMessage
      :name="name"
      class="input__text-danger"
    />
  </div>
</template>

<script setup lang="ts">

defineProps({
  formName: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  data: {
    type: String,
    default: '',
  },
  password: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  currency: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: 'medium',
  },
})
const emit = defineEmits(['showPassword', 'fiveNumbers'])
const isFocused = ref(false)
const isEmpty = ref(true)
const isError = ref(false)

// Maneja cuando el input tiene foco
const onFocus = () => {
  isFocused.value = true
}

// Maneja cuando el input pierde el foco
const onBlur = () => {
  isFocused.value = false
}

// Función para emitir evento de mostrar/ocultar contraseña
const showPassword = (type: string, name: string) => {
  emit('showPassword', type, name)
}

// Validar la entrada y emitir el evento solo cuando sean 5 números
const validateAndEmit = (val:any) => {
  // Prevenir cualquier cosa que no sea número (solo números permitidos)
  const numericValue = val?.replace(/\D/g, '') // Quita cualquier cosa que no sea número
  isEmpty.value = !numericValue

  // Si el valor tiene exactamente 5 dígitos, emite el evento 'fiveNumbers'
  if (numericValue.length === 5) {
    emit('fiveNumbers', numericValue)
  }

  // Actualiza el valor en el campo input
  return numericValue
}

const listenerValue = (val:any) => {
  isEmpty.value = !val
  return !val
}

</script>

<style lang="scss" scoped>
@import "@/assets/sass/custom/Input.scss";
</style>

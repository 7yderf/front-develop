<template>
  <div
    class="field position-relative"
    :data-Type="data"
  >

    <div
      class="input input__box position-relative"
      :data-Type="data"
      :data-focus="isFocused"
      :data-error="isError"
      :data-empty="isEmpty"
      :data-readOnly="readonly"
      @mouseleave="() => (tooltipVisible = false, isFocused = false)"
      @blur="() => (tooltipVisible = false, isFocused = false)"
    >
      <InputsFieldLabel
        :label="label"
        :data="data"
        :data-focus="isFocused || !isEmpty"
        :form-name="formName"
        :data-height="height"
        :data-withIcon="!!icon"
      />
      <div
        class="input__select-disabled"
        :data-disabled="readonly"
      />
      <VField
        v-slot="{
          field, meta, errors, value,
        }"
        v-model="searchGlobal"
        :name="name"
      >
        <InputsCustomInput
          v-bind="field"
          :label="label"
          :form-name="formName"
          :icon="icon"
          :meta="meta"
          :errors="errors"
          :placeholder="placeholder"
          :type="type"
          :disabled="!isSearch"
          :search-global="searchGlobal"
          :height="height"
          @focus="showSearch"
          @blur="blurEvent"
          @click="debounceInput"
          @toggle="showclick"
        />
        <span :data-listener="listenerValue(value)" />
      </VField>
      <InputsTooltip
        v-if="tooltipVisible"
        id="tooltip"
        :data-Show="tooltipVisible"
        :keys-identify="keysIdentify"
        :items="tooltipItems"
        @select="serchParams"
      />
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
  selectInfo: {
    type: Array,
    default: () => [],
  },
  keysIdentify: {
    type: Object as PropType<{ id: string; name: string }>,
    default: () => ({
      id: 'id',
      name: 'name',
    }),
  },
  reset: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  setValue: {
    type: String,
    default: 'Selecione una opción',
  },
  defaultValue: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: 'medium',
  },
  isSearch: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['select'])

const isFocused = ref(false)
const isEmpty = ref(true)
const isError = ref(false)

const searchGlobal = ref('')
const datosIniciales = ref<Record<string, any>[]>([])

// Tooltip
const tooltipVisible = ref(false)

const tooltipItems = computed(() => [{ [props.keysIdentify.name]: props.setValue, [props.keysIdentify.id]: '' }, ...datosIniciales.value])

const showSearch = () => {
  isFocused.value = true
}

const blurEvent = () => {
  isFocused.value = false
}

const serchParams = (value: Record<string, any>) => {
  searchGlobal.value = value[props.keysIdentify.name] === props.setValue ? '' : value[props.keysIdentify.name]
  tooltipVisible.value = false
  emits('select', value, value[props.keysIdentify.name])
}

const debounceInput = () => {
  datosIniciales.value = props.selectInfo as Record<string, any>[]
  tooltipVisible.value = !tooltipVisible.value
  isFocused.value = true
}

const showclick = () => {
  debounceInput()
}

watch(() => props.reset, () => {
  searchGlobal.value = ''
})

watch(() => props.selectInfo, () => {
  datosIniciales.value = props.selectInfo as Record<string, any>[]
  if (props.selectInfo.length === 0) {
    searchGlobal.value = ''
  }
})

watch(() => props.defaultValue, () => {
  searchGlobal.value = props.defaultValue
})

const listenerValue = (val: string) => {
  isEmpty.value = !val
  return !val
}

onMounted(() => {
  if (props.defaultValue) {
    searchGlobal.value = props.defaultValue
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/sass/custom/Input.scss";

.input__select-disabled{
  &[data-disabled="true"]{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #00000000;
    z-index: 1;
  }
}

#tooltip {
  border-radius: 5px;
  box-shadow: 0px 0px 5px #999;
}

</style>

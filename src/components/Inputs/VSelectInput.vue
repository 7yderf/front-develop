<!-- eslint-disable vuejs-accessibility/mouse-events-have-key-events -->
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
      @mouseleave="focusOut"
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
        v-show="!!searchGlobal"
        class="file-list"
      >
        <div class="file-item" />
        <Icon
          name="carbon:close-outline"
          class="file-item-icon"
          @click="clearInput"
        />
      </div>
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
        v-show="tooltipVisible"
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

// Subcomponentes

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

const initValueEdit = ref('')

const isFocused = ref(false)
const isEmpty = ref(true)
const isError = ref(false)

const searchGlobal = ref('')
const datosIniciales = ref<Array<Record<string, any>>>([])

// Tooltip
const tooltipVisible = ref(false)

const focusOut = () => {
  tooltipVisible.value = false
  if (!props.isSearch) {
    isFocused.value = false
  }
}

const tooltipItems = computed(() => [{ [props.keysIdentify.name]: props.setValue, [props.keysIdentify.id]: '' }, ...datosIniciales.value])

const showSearch = () => {
  isFocused.value = true
}

const blurEvent = () => {
  isFocused.value = false
}

const serchParams = (value: Record<string, any>) => {
  console.log('🚀 ~ serchParams ~ value:', value)
  // eslint-disable-next-line eqeqeq
  searchGlobal.value = value[props.keysIdentify.name] == props.setValue ? '' : value[props.keysIdentify.name]
  console.log('🚀 ~ serchParams ~ searchGlobal.value:', searchGlobal.value)
  tooltipVisible.value = false
  if (searchGlobal.value) {
    emits('select', value, value[props.keysIdentify.name])
  }
  if (props.isSearch) {
    datosIniciales.value = props.selectInfo as Array<Record<string, any>>
  }
}

const debounceInput = () => {
  datosIniciales.value = props.selectInfo as Array<Record<string, any>>
  tooltipVisible.value = !tooltipVisible.value
  isFocused.value = true
}

const clearInput = () => {
  console.log('clearInput')
  searchGlobal.value = ''
}

const showclick = () => {
  debounceInput()
}

watch(() => searchGlobal.value, val => {
  if (props.isSearch) {
    if (val) {
      // eslint-disable-next-line vue/max-len
      datosIniciales.value = (props.selectInfo as Array<Record<string, any>>).filter(item => item[props.keysIdentify.name].toLowerCase().includes(searchGlobal.value.toLowerCase()))
    } else {
      datosIniciales.value = props.selectInfo as Array<Record<string, any>>
    }
  }
})

watch(() => props.reset, () => {
  if (props.defaultValue) {
    searchGlobal.value = props.defaultValue
  } else {
    searchGlobal.value = ''
  }
})

watch(() => props.selectInfo, () => {
  datosIniciales.value = props.selectInfo as Array<Record<string, any>>
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
    initValueEdit.value = props.defaultValue
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/scss/Inputs/Input.scss";
.file-list {
  position: absolute;
  //width: 100%;
  top: 0;
  //left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 40px;
  z-index: 2;
  .file-item {
    margin-bottom: 0.2rem;
  }
}

.input__select-disabled{
  &[data-disabled="true"]{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #00000000;
    z-index: 3;
  }
}

#tooltip {
  border-radius: 5px;
  box-shadow: 0px 0px 5px #999;
}

</style>

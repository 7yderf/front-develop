<!-- eslint-disable no-param-reassign -->
<!-- eslint-disable consistent-return -->
<!-- eslint-disable camelcase -->
<!-- eslint-disable eqeqeq -->
<script setup>
import * as yup from 'yup'
import { storeToRefs } from 'pinia'

const props = defineProps({
  ubication: {
    type: String,
    default: 'Home',
  },
})
const showRange = ref(false)
const storB = useFilters()
const {
  getInitialValues, getSearchIdForName, getFilters, getSearchNameForId, cleanFilters,
} = storB
const { filters } = storeToRefs(storB)
const form = ref(null)
const reset = ref(false)
const paramsRange = ref([])
const setParams = useSetFilters()
const propertyTypesList = computed(() => getInitialValues('property_types'))
const operationTypeList = computed(() => getInitialValues('operation_types'))
const lotSize = computed(() => getInitialValues('lot_size'))
const constructionSize = computed(() => getInitialValues('construction_size'))
const filterPropertyTypes = computed(() => getFilters('property_types'))
const filterOperationType = computed(() => getFilters('operation_type'))
const filterLotSize = computed(() => `${getFilters('min_lot_size')},${getFilters('max_lot_size')}`)
const filterConstructionSize = computed(() => `${getFilters('min_construction_size')},${getFilters('max_construction_size')}`)
const filterbedrooms = computed(() => getFilters('min_bedrooms'))
const filterbathrooms = computed(() => getFilters('min_bathrooms'))

const formValues = ref({
  propertyTypes: [],
  operation_type: getSearchNameForId('operation_types', filterOperationType.value)?.name || '',
  construction_size: getSearchNameForId('construction_size', filterConstructionSize.value)?.name || '',
  lot_size: getSearchNameForId('lot_size', filterLotSize.value)?.name || '',
})

const schema = markRaw(
  yup.object().shape({}),
)

const convertPropertyTypes = () => {
  const { propertyTypes } = paramsRange.value
  // Verificar si propertyTypes es una cadena y convertirla a un arreglo si es necesario
  if (typeof propertyTypes === 'string') {
    paramsRange.value.propertyTypes = propertyTypes.split(',')
  }
  // Verificar si propertyTypes es un arreglo y convertirlo de nuevo a una cadena si contiene elementos
  paramsRange.value.propertyTypes = Array.isArray(propertyTypes) && propertyTypes.length > 0
    ? propertyTypes.join(',')
    : ''
}

const onSubmit = async values => {
  convertPropertyTypes()

  values.operation_type = values.operation_type && getSearchIdForName('operation_types', values.operation_type)?.id
  values.construction_size = values.construction_size && getSearchIdForName('construction_size', values.construction_size)?.id
  values.lot_size = values.lot_size && getSearchIdForName('lot_size', values.lot_size)?.id

  const data = { ...values, ...paramsRange.value }

  // no enviar valores vacios en la url
  Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] === null) {
      delete data[key]
    }
  })

  if (props.ubication === 'home') {
    useRouter().push({
      path: '/property',
      query: {
        ...{ ...data },
      },
    })
  } else {
    useRouter().replace({
      query: {
        ...{ ...data },
      },
    })
  }
}

const listenerRange = (valInit, valMax, type) => {
  const typeItem = { [type]: `${parseNumber(valInit)},${parseNumber(valMax)}` }
  paramsRange.value = { ...paramsRange.value, ...typeItem }
}

const listenerNumber = (val, type) => {
  const typeItem = { [type]: val }
  paramsRange.value = { ...paramsRange.value, ...typeItem }
}

onMounted(async () => {})

watch(
  () => setParams.value,
  () => {
    reset.value = !reset.value
    cleanFilters()
    form.value?.resetForm()
    useRouter().replace({
      query: {
        ...{ },
      },
    })
  },
)

</script>
<!-- eslint-disable vuejs-accessibility/mouse-events-have-key-events -->

<template>
  <div
    class="form"
    :data-ubication="ubication"
  >
    <div
      id="isHome"
      class="form__bullets"
    />
    <VForm
      ref="form"
      class="form__container"
      :class="ubication === 'home' ? 'home' : 'filter'"
      :validation-schema="schema"
      :initial-values="formValues"
      @submit="onSubmit"
    >
      <div class="form__box form__box--mobile">
        <div
          class="form__box-label mb-3"
          :class="ubication === 'home' ? 'home' : 'filter'"
        >
          <h6
            v-if="ubication !== 'home'"
            class="form__text--label"
          >
            Tipos de propiedad
          </h6>
          <FormVSelectListCheck
            :class="ubication === 'home' ? 'home' : 'filter'"
            type="checkbox"
            name="propertyTypes"
            label="Tipos de propiedad"
            placeholder="Selecione una opción"
            icon=""
            :select-info="propertyTypesList"
            :vue-model="filterPropertyTypes"
            :reset="reset"
            :from="ubication"
            @select="listenerNumber"
          />
        </div>
        <FormVSelectInput
          :class="ubication === 'home' ? 'home' : 'filter'"
          type="text"
          name="operation_type"
          label="Tipo de operación"
          placeholder="Tipo de operación"
          icon=""
          :select-info="operationTypeList"
          :set-value="'Tipo de operación' "
          :reset="reset"
          :disabled="false"
          :from="ubication"
        />
        <FormVSelectInput
          v-if="ubication !== 'home'"
          :class="'filter'"
          type="text"
          name="construction_size"
          label="Superficie construida"
          placeholder="Superficie construida"
          icon=""
          :select-info="constructionSize"
          :reset="reset"
          :disabled="false"
          :from="ubication"
        />
        <FormVSelectInput
          v-if="ubication !== 'home'"
          :class="'filter'"
          type="text"
          name="lot_size"
          label="Superficie total"
          placeholder="Superficie total"
          icon=""
          :select-info="lotSize"
          :reset="reset"
          :disabled="false"
          :from="ubication"
        />
        <div
          v-if="ubication !== 'home'"
          class="form__box-label"
        >
          <h6 class="form__text--label">
            Precio
          </h6>
          <FormRange
            :val-min="filters.search.min_price || getInitialValues('price').min"
            :val-max="filters.search.max_price || getInitialValues('price').max"
            :val-init-min="getInitialValues('price').min"
            :val-init-max="getInitialValues('price').max"
            :type="'price'"
            @searchRange="listenerRange"
          />
        </div>
        <div
          v-if="ubication !== 'home'"
          class="form__box-units"
        >
          <div class="form__units">
            <h6 class="form__text--unit">
              Numero de recamaras
            </h6>
            <FormInputNumber
              :type="'min_bedrooms'"
              :initial-value="getInitialValues('min_bedrooms')"
              :vue-model="filterbedrooms"
              @listener-number="listenerNumber"
            />
          </div>
          <div class="form__units">
            <h6 class="form__text--unit">
              Numero de baños
            </h6>
            <FormInputNumber
              :type="'min_bathrooms'"
              :initial-value="getInitialValues('min_bathrooms')"
              :vue-model="filterbathrooms"
              @listener-number="listenerNumber"
            />
          </div>
        </div>
        <div
          v-if="ubication === 'home'"
          class="form__box-label form__box-label--range"
          @mouseleave="() => showRange = false"
        >
          <button
            type="button"
            class="form__button-show"
            @click="() => showRange = !showRange"
          >
            Rango de precio
            <Icon
              :name="showRange ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'"
              size="16"
            />
          </button>
          <FormRange
            class="form__box-range-home"
            :data-show="showRange"
            :val-min="filters.search.min_price || getInitialValues('price').min"
            :val-max="filters.search.max_price || getInitialValues('price').max"
            :val-init-min="getInitialValues('price').min"
            :val-init-max="getInitialValues('price').max"
            :type="'price'"
            @search-range="listenerRange"
          />
        </div>
      </div>
      <div
        class="form__submit"
        :class="ubication === 'home' ? 'home' : 'filter'"
        type="submit"
      >
        <button
          type="submit"
          class="form__submit-btn"
          :data-ubication="ubication"
        >
          Buscar
        </button>
      </div>
    </VForm>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/Mixins";
.form{
  $root: &;
  &__container.home{
    @include flex;
    padding: 8px 0;
    @media screen and (max-width: 1400px) {
        flex-direction: column;
        gap: 16px;
      }
  }
  &[data-ubication="home"]{
    width: 100%;
    #{$root}__box{
      flex-direction: row;
      padding: 0 16px;
      justify-content: flex-start;
      @media screen and (max-width: 1400px) {
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
      }
    }
  }
  &__bullets{
    @include flex;
    gap: 4px;
    flex-wrap: wrap;
    width: 100%;
    padding: 16px 0;
  }
  &__text{
    &--label{
      @include text(1.6rem, 600, 1.6rem, left);
      padding-left: 5%;
      letter-spacing: 1.1px;
      padding-bottom: 4px;
      color: var(--text-color);
    }
    &--unit{
      @include text(1.5rem, 600, 1.6rem, left);
      letter-spacing: 1.1px;
      padding-bottom: 4px;
      color: var(--text-color);
    }
  }
  &__box-units{
    @include flex;
    gap: 8px;
  }
  &__units{
    @include flex;
    flex-direction: column;
    flex-grow: 1;
  }
  &__box{
    @include flex(space-between, 16px, stretch);
    flex-direction: column;
    width: 100%;
    padding: 16px 8px 0;
  }
  &__box-label{
    &.home{
      width: 100%;
      max-width: 300px;
      margin-bottom: 0!important;
    }
    &--range{
      position: relative;
      width: 300px;
    }
  }
  &__box-range-home{
    display: none;
    &[data-show="true"]{
      display: block;
      position: absolute;
      background: white;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
      padding: 16px 8px;
      z-index: 1;
      margin-top: 0px!important;
    }
  }
  &__submit{
    width: 100%;
    margin-bottom: 48px;
    padding: 16px;
    &.home{
      margin-bottom: 0;
      padding: 0;
      width: auto;
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
    border-color: var(--text-color);
    &[data-ubication="home"]{
      border-radius: 8px;
      margin: auto;
      max-width: 300px;
      width: 300px;
      padding: 14px 32px;

    }
  }
  &__text{
    @include text(2.4rem, 400, 2.8rem, left);
    margin: 16px 0 32px;
  }
  &__button-show{
    @include button();
    min-height: 50px;
    width: 100%;
    max-width: inherit;
  }
}

@media screen and (max-width: 768px) {
  .form{
    &__box{
      &--mobile{
        flex-direction: column ;
        gap: 0;
        .field{
          width: 100%;

        }
      }
    }
  }
}

</style>

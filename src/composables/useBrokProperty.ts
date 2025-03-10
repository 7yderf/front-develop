// eslint-disable-next-line import/extensions
import { useFilters } from '@/stores/FiltersBrok'

export default function useBrokProperty() {
  const { public: { API_BASE_URL } } = useRuntimeConfig()

  const store = useFilters()

  const { transformFiltersToQueryParams } = store
  async function fetchProperties() {
    const productsList = ref(null)
    let error = null
    const queryParams = transformFiltersToQueryParams()
    const options = {
      method: 'GET',
    }

    const queryString = new URLSearchParams(queryParams).toString()
    const url = `${API_BASE_URL}?${decodeURIComponent(queryString)}`

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de propiedades')
      }
      const data = await response.json()
      productsList.value = data.data
    } catch (err: any) {
      error = err
    }
    return { productsList, error }
  }
  async function fetchPropertyById(id: string) {
    let error = null
    const options = {
      method: 'GET',
    }

    const url = `${API_BASE_URL}properties/${id}`

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('No se pudo obtener la propiedad')
      }
      const data = await response.json()
      console.log('🚀 ~ fetchProperties ~ data:', data)
      return data.data
    } catch (err: any) {
      error = err
    }
    return { error }
  }

  return { fetchProperties, fetchPropertyById }
}

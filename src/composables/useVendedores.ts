/* eslint-disable import/extensions */
import { useSellerStore } from '@/stores/SellersStore'
import { storeToRefs } from 'pinia'

export default function useVendedores() {
  const { public: { API_BASE_URL } } = useRuntimeConfig()
  const store = useSellerStore()

  const { setSeller, reset } = store
  const { seller } = storeToRefs(store)

  async function fetchSellers() {
    const sellersList = ref(null)
    let error = null
    const options = {
      method: 'GET',
      credentials: 'include' as RequestCredentials,
    }
    try {
      const response = await fetch(`${API_BASE_URL}seller/`, options)
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de vendedores')
      }
      const data = await response.json()
      sellersList.value = data
    } catch (err: any) {
      error = err
    }
    return { sellersList, error }
  }

  async function fetchSellerById(id: string) {
    let error = null
    const options = {
      method: 'GET',
      credentials: 'include' as RequestCredentials,
    }

    try {
      const response = await fetch(`${API_BASE_URL}seller/${id}`, options)
      if (!response.ok) {
        throw new Error('No se pudo obtener la propiedad')
      }
      const data = await response.json()
      setSeller(data)
    } catch (err: any) {
      error = err
    }
    return { error }
  }

  async function postSeller(sell: any, idSeller: any = null) {
    let error = null
    let id = ''

    if (idSeller) {
      id = `${idSeller}`
    }
    const options = {
      method: 'POST',
      body: sell,
      credentials: 'include' as RequestCredentials,
    }

    try {
      const response = await fetch(`${API_BASE_URL}seller/${id}`, options)
      if (!response.ok) {
        throw new Error('No se pudo crear el vendedor')
      }
      const data = await response.json()
      return data
    } catch (err: any) {
      error = err
    }
    return { error }
  }

  async function deleteSeller(id: string) {
    let error = null
    const options = {
      method: 'DELETE',
      credentials: 'include' as RequestCredentials,
    }

    try {
      const response = await fetch(`${API_BASE_URL}seller/${id}`, options)
      if (!response.ok) {
        throw new Error('No se pudo eliminar el vendedor')
      }
      return response
    } catch (err: any) {
      console.log('🚀 ~ deleteSeller ~ err:', err)
      error = err
    }
    return { error }
  }

  return {
    seller,
    fetchSellers,
    fetchSellerById,
    postSeller,
    deleteSeller,
    reset: () => reset(),
  }
}

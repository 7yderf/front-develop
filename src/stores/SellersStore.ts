/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'

// interface sellerState {
// count:number;
// }

export const useSellerStore = defineStore('seller', () => {
  const getInitialState = (): any => ({
    id: '',
    img: '',
    title: '',
    position: '',
    telephone: '',
  })

  const seller = ref(getInitialState())

  const reset = () => {
    seller.value = getInitialState()
  }

  return {

    // state
    seller,
    // getters

    // actions
    reset,
    setSeller(newSeller: any) {
      let position = ''
      let telephone = ''

      newSeller.description?.forEach((element: any) => {
        if (element.description_title === 'Teléfono') {
          telephone = element.description_text
        } else {
          position = element.description_title
        }
      })

      seller.value = {
        id: newSeller.id,
        img: newSeller.img,
        title: newSeller.name,
        position,
        telephone,
      }
    },

  }
})

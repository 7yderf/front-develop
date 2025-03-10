/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'

interface InitialValues {
  [key: string]: any;
}

export const useInitialValues = defineStore('initialValues', {

  state: () => ({
    initialValues: <InitialValues> {
      property_types: [
        {
          name: 'Edificio',
          identificador: '1',
        },
        {
          name: 'Bodega comercial',
          identificador: '2',
        },
        {
          name: 'Local comercial',
          identificador: '3',
        },
        {
          name: 'Nave industrial',
          identificador: '4',
        },
        {
          name: 'Rancho',
          identificador: '5',
        },
        {
          name: 'Quinta',
          identificador: '6',
        },
        {
          name: 'Casa en condominio',
          identificador: '7',
        },
        {
          name: 'Casa con uso de suelo',
          identificador: '8',
        },
        {
          name: 'Terreno comercial',
          identificador: '9',
        },
        {
          name: 'Local en centro comercial',
          identificador: '10',
        },
        {
          name: 'Bodega industrial',
          identificador: '11',
        },
        {
          name: 'Departamento',
          identificador: '12',
        },
        {
          name: 'Casa',
          identificador: '13',
        },
        {
          name: 'Terreno',
          identificador: '14',
        },
        {
          name: 'Oficina',
          identificador: '15',
        },
        {
          name: 'Local',
          identificador: '16',
        },
        {
          name: 'Otro',
          identificador: '17',
        },
        {
          name: 'Terreno industrial',
          identificador: '18',
        },
      ],
      operation_types: [
        {
          name: 'Venta',
          id: 'sale',
        },
        {
          name: 'Renta',
          id: 'rental',
        },
        {
          name: 'Renta temporal',
          id: 'temporary_rental',
        },

      ],
      lot_size: [
        {
          name: 'Menos de 200 mt2',
          id: '1,200',
        },
        {
          name: '200 mt2 - 1,000 mt2',
          id: '200,1000',
        },
        {
          name: '1,000 mt2 - 10,000 mt2',
          id: '1000,2000',
        },
        {
          name: '1 ha - 10 ha',
          id: '10000,100000',
        },
        {
          name: '10 ha - 20 ha',
          id: '100000,200000',
        },
        {
          name: '20 ha - 50 ha',
          id: '200000,500000',
        },
        {
          name: '50 ha - 100 ha',
          id: '500000,1000000',
        },

      ],
      construction_size: [
        {
          name: 'Menos de 200 mt2',
          id: '1,200',
        },
        {
          name: '200 mt2 - 500 mt2',
          id: '200,500',
        },
        {
          name: '500 mt2 - 700 mt2',
          id: '500,700',
        },
        {
          name: '700 mt2 - 1000 mt2',
          id: '700,1000',
        },
        {
          name: 'Más de 1000 mt2',
          id: '1000,100000',
        },
      ],
      price: {
        min: 160000,
        max: 10000000,
      },
      min_bedrooms: 1,
      min_bathrooms: 1,
    },

  }),
  getters: {
    getInitialValues: state => (type: string) => state.initialValues[type],

    getSearchIdForName: state => (type: string, name: string, nameOpcional: string) => {
      const search = nameOpcional
        ? state.initialValues[type].find((item: any) => item[nameOpcional] === name)
        : state.initialValues[type].find((item: any) => item.name === name)
      return search
    },
    getSearchNameForId: state => (type: string, id: string, otherId:string) => {
      const search = otherId
        ? state.initialValues[type]?.find((item: any) => item[otherId] === id)
        : state.initialValues[type]?.find((item: any) => item.id === id)
      return search
    },
  },
  actions: {
    setInitialValues(newInitialValues: any) {
      this.initialValues = newInitialValues
    },
  },
})

import AsyncStorage from '@react-native-community/async-storage'

const BASE_API = 'https://milkpoint.serviceapp.net.br/api'
//const BASE_API  = 'http://192.168.0.128:8080/api/'
//const BASE_API  = 'https://milkpoint.herokuapp.com/api/'

export default {
    //REQUISIÇÕES DO TÉCNICO

    //Carregar lista de técnicos
    getTechnicians: async () => {
        const request = await fetch(`${BASE_API}/tecnico`)
        const response = await request.json()
        return response
    },

    //Carregar lista de produtores
    getProducers: async () => {
        const request = await fetch(`${BASE_API}/produtor`)
        const response = await request.json()
        return response
    },

    //Carregar lista de laticínios
    getDairies: async () => {
        const request = await fetch(`${BASE_API}/laticinio`)
        const response = await request.json()
        return response
    },

    //Carregar lista de responsáveis
    getResponsibles: async () => {
        const request = await fetch(`${BASE_API}/responsavel`)
        const response = await request.json()
        return response
    },


}

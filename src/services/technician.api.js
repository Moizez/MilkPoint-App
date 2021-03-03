import AsyncStorage from '@react-native-community/async-storage'
import BASE from './base'

export default {
    //REQUISIÇÕES DO TÉCNICO

    //Carregar lista de técnicos
    getTechnicians: async () => {
        const request = await fetch(`${BASE.API}/tecnico`)
        const response = await request.json()
        return response
    },

    //Carregar lista de produtores
    getProducers: async () => {
        const request = await fetch(`${BASE.API}/produtor`)
        const response = await request.json()
        return response
    },

    //Carregar lista de laticínios
    getDairies: async () => {
        const request = await fetch(`${BASE.API}/laticinio`)
        const response = await request.json()
        return response
    },

    //Carregar lista de responsáveis
    getResponsibles: async () => {
        const request = await fetch(`${BASE.API}/responsavel`)
        const response = await request.json()
        return response
    },

    //Pega a lista de tanques
    getTanks: async (status) => {
        const request = await fetch(`${BASE.API}/tanque/${status}`)
        const response = await request.json()
        return response
    }
}

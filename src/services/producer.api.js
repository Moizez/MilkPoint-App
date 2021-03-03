import AsyncStorage from '@react-native-community/async-storage'
import BASE from './base'

export default {
    //REQUISIÇÕES DO PRODUTOR

    //Carregar lista de produtores
    getProducers: async () => {
        const request = await fetch(`${BASE.API}/produtor`)
        const response = await request.json()
        return response
    },

    //Carregar lista de produtores
    getProducer: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/produtor/${user.id}`)
        const response = await request.json()
        return response
    },

    //Carregar lista de depósitos pendentes do produtor logado
    getPendingDepositsProducer: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/deposito/pendentes/${user.id}`)
        const response = await request.json()
        return response
    },

    //Lista de depositos pendentes
    getPendingDeposits: async () => {
        const request = await fetch(`${BASE.API}/deposito/listapendentes`)

        const response = await request.json()
        console.log(response)
        return response
    },

    //Lista de todos os depositos excluidos ou confirmados
    getResolvedDeposits: async () => {
        const request = await fetch(`${BASE.API}/deposito/resolvidos`)

        const response = await request.json()
        return response
    }
}

import AsyncStorage from '@react-native-community/async-storage'

const BASE_API = 'https://milkpoint.serviceapp.net.br/api'
//const BASE_API  = 'http://192.168.0.128:8080/api/'
//const BASE_API  = 'https://milkpoint.herokuapp.com/api/'

export default {
    //REQUISIÇÕES DO PRODUTOR

    //Carregar lista de produtores
    getProducers: async () => {
        const request = await fetch(`${BASE_API}/produtor`)
        const response = await request.json()
        return response
    },

    //Carregar lista de produtores
    getProducer: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE_API}/produtor/${user.id}`)
        const response = await request.json()
        return response
    },

    //Carregar lista de depósitos pendentes do produtor logado
    getPendingDepositsProducer: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE_API}/deposito/pendentes/${user.id}`)
        const response = await request.json()
        return response
    },

    //Lista de depositos pendentes
    getPendingDeposits: async () => {
        const request = await fetch(`${BASE_API}/deposito/listapendentes`)

        const response = await request.json()
        console.log(response)
        return response
    },

    //Lista de todos os depositos excluidos ou confirmados
    getResolvedDeposits: async () => {
        const request = await fetch(`${BASE_API}/deposito/resolvidos`)

        const response = await request.json()
        return response
    }
}

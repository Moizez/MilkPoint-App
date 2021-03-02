import AsyncStorage from '@react-native-community/async-storage'

const BASE_API = 'https://milkpoint.serviceapp.net.br/api'
//const BASE_API  = 'http://192.168.0.128:8080/api/'
//const BASE_API  = 'https://milkpoint.herokuapp.com/api/'

export default {
    //REQUISIÇÕES DO LATICÍNIO

    //Carregar lista de laticínios
    getDairies: async () => {
        const request = await fetch(`${BASE_API}/laticinio`)
        const response = await request.json()
        return response
    },

    //Carregar lista de laticínios
    getDairy: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))
        
        const request = await fetch(`${BASE_API}/laticinio/${user.id}`)
        const response = await request.json()
        return response
    },

    //Carregar lista de retiradas pendentes do laticinio logado
    getPendingWithdrawalsDairy: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE_API}/retirada/pendentes/${user.id}`)
        const response = await request.json()
        return response
    },

    //Lista de retiradas pendentes
    getPendingWithdrawals: async () => {
        const request = await fetch(`${BASE_API}/retirada/listapendentes`)
        const response = await request.json()
        return response
    },

    //Lista de todos os retiradas excluidos ou confirmados
    getResolvedWithdrawals: async () => {
        const request = await fetch(`${BASE_API}/retirada/resolvidos`)
        const response = await request.json()
        return response
    }
}

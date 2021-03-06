import AsyncStorage from '@react-native-community/async-storage'
import BASE from './base'

export default {
    //REQUISIÇÕES DO LATICÍNIO

    //Carregar lista de laticínios
    getDairies: async () => {
        const request = await fetch(`${BASE.API}/laticinio`)
        const response = await request.json()
        return response
    },

    //Carregar lista de laticínios
    getDairy: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))
        
        const request = await fetch(`${BASE.API}/laticinio/${user.id}`)
        const response = await request.json()
        return response
    },

    //Carregar lista de retiradas pendentes do laticinio logado
    getPendingWithdrawalsDairy: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/retirada/pendentes/${user.id}`)
        const response = await request.json()
        return response
    },

    //Lista de retiradas pendentes
    getPendingWithdrawals: async () => {
        const request = await fetch(`${BASE.API}/retirada/listapendentes`)
        const response = await request.json()
        return response
    },

    getResolvedWithdrawalsUser: async (status) => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/retirada/${status}/${user.id}`)

        const response = await request.json()
        return response
    },

    //Lista de todos os retiradas excluidos ou confirmados
    getResolvedWithdrawals: async () => {
        const request = await fetch(`${BASE.API}/retirada/resolvidos`)
        const response = await request.json()
        return response
    }
}

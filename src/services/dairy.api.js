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

    //Lista de todos os retiradas excluidos ou confirmados
    getAllWithdrawalsResolved: async () => {
        const request = await fetch(`${BASE.API}/retirada/resolvidos`)
        const response = await request.json()
        return response
    },

    //Lista de todos os retiradas excluidos ou confirmados
    getAllWithdrawalsConfirmedOrCanceled: async (status) => {
        const request = await fetch(`${BASE.API}/retirada/${status}`)
        const response = await request.json()
        return response
    },

    getAllWithdrawalsConfirmedOrCanceledUser: async (status) => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/retirada/${status}/${user.id}`)

        const response = await request.json()
        return response
    },

    setWithdrawal: async (quantidade, idTanque) => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const data = new FormData()
        data.append("quantidade", quantidade)
        data.append("idLat", user.id)
        data.append("idTanque", idTanque)

        await fetch(`${BASE.API}/retirada`, { method: 'POST', body: data })
    },

    setCancelWithdrawal: async (confirmacao, idRetirada) => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const data = new FormData();
        data.append("confirmacao", confirmacao)
        data.append("idRetirada", idRetirada)
        data.append("whoCanceled", user.apelido)
        data.append("idWhoCanceled", user.id)
        data.append("observacao", "")

        await fetch(`${BASE.API}/retirada/confirmacao`, { method: 'POST', body: data })
    }
}

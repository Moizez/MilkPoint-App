import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE from './base'

export default {
    //REQUISIÇÕES DO LATICÍNIO

    //Carregar lista de laticínios
    getDairies: async () => {
        try {
            const request = await fetch(`${BASE.API}/laticinio`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error getDairies: ' + e)
        }
    },

    //Carregar lista de laticínios
    getDairy: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/laticinio/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error getDairy: ' + e)
        }
    },

    //Carregar lista de retiradas pendentes do laticinio logado
    getPendingWithdrawalsDairy: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/retirada/pendentes/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error getPendingWithdrawalsDairy: ' + e)
        }
    },

    //Lista de retiradas pendentes
    getPendingWithdrawals: async () => {
        try {
            const request = await fetch(`${BASE.API}/retirada/listapendentes`)

            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error getPendingWithdrawals: ' + e)
        }
    },

    //Lista de todos os retiradas excluidos ou confirmados
    getAllWithdrawalsResolved: async () => {
        try {
            const request = await fetch(`${BASE.API}/retirada/resolvidos`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error getAllWithdrawalsResolved: ' + e)
        }
    },

    //Lista de todos os retiradas excluidos ou confirmados
    getAllWithdrawalsConfirmedOrCanceled: async (status) => {
        try {
            const request = await fetch(`${BASE.API}/retirada/${status}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error getAllWithdrawalsConfirmedOrCanceled: ' + e)
        }
    },

    getAllWithdrawalsConfirmedOrCanceledUser: async (status) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/retirada/${status}/${user.id}`)

            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error getAllWithdrawalsConfirmedOrCanceledUser: ' + e)
        }
    },

    setWithdrawal: async (quantidade, idTanque) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const data = new FormData()
            data.append("quantidade", quantidade)
            data.append("idLat", user.id)
            data.append("idTanque", idTanque)

            await fetch(`${BASE.API}/retirada`, { method: 'POST', body: data })
        } catch (e) {
            console.log('Error setWithdrawal: ' + e)
        }
    },

    setCancelWithdrawal: async (confirmacao, idRetirada) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const data = new FormData();
            data.append("confirmacao", confirmacao)
            data.append("idRetirada", idRetirada)
            data.append("whoCanceled", user.apelido)
            data.append("idWhoCanceled", user.id)
            data.append("observacao", "")

            await fetch(`${BASE.API}/retirada/confirmacao`, { method: 'POST', body: data })
        } catch (e) {
            console.log('Error setCancelWithdrawal: ' + e)
        }
    }
}

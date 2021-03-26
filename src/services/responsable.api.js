import AsyncStorage from '@react-native-community/async-storage'
import BASE from './base'

export default {
    //REQUISIÇÕES DO RESPONSÁVEL

    //Carregar lista de responsáveis
    getResponsibles: async () => {
        const request = await fetch(`${BASE.API}/responsavel`)
        const response = await request.json()
        return response
    },

    //Carregar lista de responsáveis
    getResponsible: async () => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const request = await fetch(`${BASE.API}/responsavel/${user.id}`)
        const response = await request.json()
        return response
    },

    //Retona uma lista apenas com os tanques do responsável logado
    getResponsibleTanks: async () => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const request = await fetch(`${BASE.API}/responsavel/${user.id}/tanque`)
        const response = await request.json()
        return response
    },

    //Lista de depositos pendentes
    getResponsiblePendingDeposits: async () => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const request = await fetch(`${BASE.API}/deposito/listapendentes`)
        const response = await request.json()
        const result = response.filter(d => d.tanque.responsavel.id === user.id)

        return result
    },

    //Lista de depositos pendentes
    getResponsiblePendingWithdrawals: async () => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const request = await fetch(`${BASE.API}/retirada/listapendentes`)
        const response = await request.json()
        const result = response.filter(d => d.tanque.responsavel.id === user.id)

        return result
    },

    getAllDepositsOrWithdrawalsResolved: async (type) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const request = await fetch(`${BASE.API}/${type}/resolvidos/responsavel/${user.id}`)
        const response = await request.json()
        return response
    },

    getAllDepositsConfirmedOrCanceledUser: async (status, id) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const request = await fetch(`${BASE.API}/deposito/${status}/responsavel/${user.id}`)
        const response = await request.json()
        return response
    },

    getAllWithdrawalsConfirmedOrCanceledUser: async (status) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const request = await fetch(`${BASE.API}/retirada/${status}/responsavel/${user.id}`)
        const response = await request.json()
        return response
    },

    setDepositConfirmation: async (confirmacao, idDeposito, observacao) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const data = new FormData();
        data.append("confirmacao", confirmacao)
        data.append("idDeposito", idDeposito)
        data.append("whoCanceled", user.nome)
        data.append("idWhoCanceled", user.id)
        data.append('observacao', observacao)

        await fetch(`${BASE.API}/deposito/confirmacao`, { method: 'POST', body: data })
    },

    setWithdrawalConfirmation: async (confirmacao, idRetirada, observacao) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

        const data = new FormData();
        data.append("confirmacao", confirmacao)
        data.append("idRetirada", idRetirada)
        data.append("whoCanceled", user.nome)
        data.append("idWhoCanceled", user.id)
        data.append('observacao', observacao)

        await fetch(`${BASE.API}/retirada/confirmacao`, { method: 'POST', body: data })
    },

    findByNameProducerOrDairy: async (type, value) => {
        const request = await fetch(`${BASE.API}/${type}/buscar/${value}`)

        const response = await request.json()
        return response
    }

}

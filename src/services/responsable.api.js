import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE from './base'

export default {
    //REQUISIÇÕES DO RESPONSÁVEL

    //Carregar lista de responsáveis
    getResponsibles: async () => {
        try {
            const request = await fetch(`${BASE.API}/responsavel`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getResponsibles ' + e)
        }
    },

    //Carregar lista de responsáveis
    getResponsible: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/responsavel/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getResponsible ' + e)
        }
    },

    //Retona uma lista apenas com os tanques do responsável logado
    getResponsibleTanks: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/responsavel/${user.id}/tanque`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getResponsibleTanks ' + e)
        }
    },

    //Lista de depositos pendentes
    getResponsiblePendingDeposits: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/deposito/listapendentes`)
            const response = await request.json()
            const result = response.filter(d => d.tanque.responsavel.id === user.id)

            return result
        } catch (e) {
            console.log('Error: getResponsiblePendingDeposits ' + e)
        }
    },

    //Lista de depositos pendentes
    getResponsiblePendingWithdrawals: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/retirada/listapendentes`)
            const response = await request.json()
            const result = response.filter(d => d.tanque.responsavel.id === user.id)

            return result
        } catch (e) {
            console.log('Error: getResponsiblePendingWithdrawals ' + e)
        }
    },

    getAllDepositsOrWithdrawalsResolved: async (type) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/${type}/resolvidos/responsavel/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getAllDepositsOrWithdrawalsResolved ' + e)
        }
    },

    getAllDepositsConfirmedOrCanceledUser: async (status) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/deposito/${status}/responsavel/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getAllDepositsConfirmedOrCanceledUser ' + e)
        }
    },

    getAllWithdrawalsConfirmedOrCanceledUser: async (status) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/retirada/${status}/responsavel/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getAllWithdrawalsConfirmedOrCanceledUser ' + e)
        }
    },

    setDepositConfirmation: async (confirmacao, idDeposito, observacao) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const data = new FormData();
            data.append("confirmacao", confirmacao)
            data.append("idDeposito", idDeposito)
            data.append("whoCanceled", user.nome)
            data.append("idWhoCanceled", user.id)
            data.append('observacao', observacao)

            await fetch(`${BASE.API}/deposito/confirmacao`, { method: 'POST', body: data })
        } catch (e) {
            console.log('Error: setDepositConfirmation ' + e)
        }
    },

    setWithdrawalConfirmation: async (confirmacao, idRetirada, observacao) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const data = new FormData();
            data.append("confirmacao", confirmacao)
            data.append("idRetirada", idRetirada)
            data.append("whoCanceled", user.nome)
            data.append("idWhoCanceled", user.id)
            data.append('observacao', observacao)

            await fetch(`${BASE.API}/retirada/confirmacao`, { method: 'POST', body: data })
        } catch (e) {
            console.log('Error: setWithdrawalConfirmation ' + e)
        }
    },

    findByNameProducerOrDairy: async (type, value) => {
        try {
            const request = await fetch(`${BASE.API}/${type}/buscar/${value}`)

            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: findByNameProducerOrDairy ' + e)
        }
    }

}

import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE from './base'

export default {

    //Carregar lista de produtores
    getProducers: async () => {
        try {
            const request = await fetch(`${BASE.API}/produtor`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getProducers ' + e)
        }
    },

    //Carregar lista de produtores
    getProducer: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/produtor/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getProducer ' + e)
        }
    },

    //Carregar lista de depósitos pendentes do produtor logado
    getPendingDepositsProducer: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/deposito/pendentes/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getPendingDepositsProducer ' + e)
        }
    },

    //Lista de depositos pendentes
    getPendingDeposits: async () => {
        try {
            const request = await fetch(`${BASE.API}/deposito/listapendentes`)

            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getPendingDeposits ' + e)
        }
    },

    //Lista de todos os depositos excluidos ou confirmados
    getAllDepositsResolved: async () => {
        try {
            const request = await fetch(`${BASE.API}/deposito/resolvidos`)

            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getAllDepositsResolved ' + e)
        }
    },

    getAllDepositsConfirmedOrCanceled: async (status) => {
        try {
            const request = await fetch(`${BASE.API}/deposito/${status}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getAllDepositsConfirmedOrCanceled ' + e)
        }
    },

    getAllDepositsConfirmedOrCanceledUser: async (status) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []
            const request = await fetch(`${BASE.API}/deposito/${status}/${user.id}`)

            const response = await request.json()
            return response

        } catch (e) {
            console.log('Error: getAllDepositsConfirmedOrCanceledUser ' + e)
        }
    },

    setDeposit: async (quantidade, idTanque) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const data = new FormData()
            data.append("quantidade", quantidade)
            data.append("idProd", user.id)
            data.append("idTanque", idTanque)

            await fetch(`${BASE.API}/deposito`, { method: 'POST', body: data })
        } catch (e) {
            console.log('Error: setDeposit ' + e)
        }
    },

    setCancelDeposit: async (confirmacao, idDeposito) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const data = new FormData();
            data.append("confirmacao", confirmacao)
            data.append("idDeposito", idDeposito)
            data.append("whoCanceled", user.nome)
            data.append("idWhoCanceled", user.id)
            data.append("observacao", "")

            await fetch(`${BASE.API}/deposito/confirmacao`, { method: 'POST', body: data })
        } catch (e) {
            console.log('Error setCancelDeposit: ' + e)
        }
    }
}

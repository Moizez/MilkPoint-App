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
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/produtor/${user.id}`)
        const response = await request.json()
        return response
    },

    //Carregar lista de depósitos pendentes do produtor logado
    getPendingDepositsProducer: async () => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/deposito/pendentes/${user.id}`)
        const response = await request.json()
        return response
    },

    //Lista de depositos pendentes
    getPendingDeposits: async () => {
        const request = await fetch(`${BASE.API}/deposito/listapendentes`)

        const response = await request.json()
        return response
    },

    //Lista de todos os depositos excluidos ou confirmados
    getAllDepositsResolved: async () => {
        const request = await fetch(`${BASE.API}/deposito/resolvidos`)

        const response = await request.json()
        return response
    },

    getAllDepositsConfirmedOrCanceled: async (status) => {
        const request = await fetch(`${BASE.API}/deposito/${status}`)
        const response = await request.json()
        return response
    },

    getAllDepositsConfirmedOrCanceledUser: async (status) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/deposito/${status}/${user.id}`)

        const response = await request.json()
        return response
    },

    setDeposit: async (quantidade, idTanque) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const data = new FormData()
        data.append("quantidade", quantidade)
        data.append("idProd", user.id)
        data.append("idTanque", idTanque)

        await fetch(`${BASE.API}/deposito`, { method: 'POST', body: data })
    },

    setCancelDeposit: async (confirmacao, idDeposito) => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const data = new FormData();
        data.append("confirmacao", confirmacao)
        data.append("idDeposito", idDeposito)
        data.append("whoCanceled", user.nome)
        data.append("idWhoCanceled", user.id)
        data.append("observacao", "")

        await fetch(`${BASE.API}/deposito/confirmacao`, { method: 'POST', body: data })
    }
}

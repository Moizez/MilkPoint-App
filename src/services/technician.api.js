import AsyncStorage from '@react-native-community/async-storage'
import BASE from './base'

export default {
    //REQUISIÇÕES DO TÉCNICO

    getActiveTanks: async () => {
        const request = await fetch(`${BASE.API}/tanque/ativos`)
        const response = await request.json()
        return response
    },

    getInactiveTanks: async () => {
        const request = await fetch(`${BASE.API}/tanque/inativos`)
        const response = await request.json()
        return response
    },

    setTankState: async (idTanque, status, observation) => {

        const request = await fetch(`${BASE.API}/tanque/${idTanque}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: idTanque,
                status: status,
                observation: observation
            })
        })
        return request
    },

    setStateRoles: async (role, status, id) => {

        const request = await fetch(`${BASE.API}/${role}/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                status: status,
            })
        })
        return request
    },

    //Carregar lista de técnicos
    getTechnicians: async () => {
        const request = await fetch(`${BASE.API}/tecnico`)
        const response = await request.json()
        return response
    },

    //Carregar lista de produtores
    getProducers: async () => {
        const request = await fetch(`${BASE.API}/produtor`)
        const response = await request.json()
        return response
    },

    //Carregar lista de laticínios
    getDairies: async () => {
        const request = await fetch(`${BASE.API}/laticinio`)
        const response = await request.json()
        return response
    },

    //Carregar lista de responsáveis
    getResponsibles: async () => {
        const request = await fetch(`${BASE.API}/responsavel`)
        const response = await request.json()
        return response
    },
}

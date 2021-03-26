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

    createTank: async (nome, tipo, capacidade, qtdAtual, dataCriacao, responsavelId, status,
        cep, localidade, uf, bairro, logradouro, complemento, latitude, longitude
    ) => {

        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user') || [])

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = {
            nome: nome,
            tipo: tipo,
            capacidade: capacidade,
            qtdAtual: qtdAtual,
            dataCriacao: dataCriacao,
            responsavel: {
                id: responsavelId,
            },
            status: status,
            cep: cep,
            localidade: localidade,
            uf: uf,
            bairro: bairro,
            logradouro: logradouro,
            complemento: complemento,
            latitude: latitude,
            longitude: longitude,
            tecnico: {
                id: user.id,
            },
        }

        await fetch(`${BASE.API}/tanque`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
    },

    updateTank: async (idTank, nome, tipo, qtdAtual, responsavelId, status, cep, localidade,
        uf, bairro, logradouro, complemento, latitude, longitude) => {

        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user') || [])

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = {
            nome: nome,
            tipo: tipo,
            qtdAtual: parseInt(qtdAtual),
            responsavel: {
                id: responsavelId,
            },
            status: status,
            cep: cep,
            localidade: localidade,
            uf: uf,
            bairro: bairro,
            logradouro: logradouro,
            complemento: complemento,
            latitude: latitude,
            longitude: longitude,
            tecnico: {
                id: user.id,
            },
        }

        await fetch(`${BASE.API}/tanque/${idTank}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        })
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
                observacao: observation
            })
        })
        return request
    },

    setStateRoles: async (role, status, id) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = { id: id, status: status }

        const request = await fetch(`${BASE.API}/${role}/${id}`,
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            }
        )
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

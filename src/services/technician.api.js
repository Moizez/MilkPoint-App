import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE from './base'

export default {
    //REQUISIÇÕES DO TÉCNICO

    getActiveTanks: async () => {
        try {
            const request = await fetch(`${BASE.API}/tanque/ativos`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getActiveTanks ' + e)
        }
    },

    getInactiveTanks: async () => {
        try {
            const request = await fetch(`${BASE.API}/tanque/inativos`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getInactiveTanks ' + e)
        }
    },

    createTank: async (nome, tipo, capacidade, qtdAtual, dataCriacao, responsavelId, status,
        cep, localidade, uf, bairro, logradouro, complemento, latitude, longitude
    ) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

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
        } catch (e) {
            console.log('Erro: createTank ' + e)
        }
    },

    updateTank: async (idTank, nome, tipo, qtdAtual, responsavelId, status, cep, localidade,
        uf, bairro, logradouro, complemento, latitude, longitude) => {
        try {

            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

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
        } catch (e) {
            console.log('Erro: updateTank ' + e)
        }
    },

    setTankState: async (idTanque, status, observation) => {
        try {
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
        } catch (e) {
            console.log('Erro: updateTank ' + e)
        }
    },

    setStateRoles: async (role, status, id) => {
        try {
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
        } catch (e) {
            console.log('Erro: setStateRoles ' + e)
        }
    },

    //Carregar lista de técnicos
    getTechnicians: async () => {
        try {
            const request = await fetch(`${BASE.API}/tecnico`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getTechnicians ' + e)
        }
    },

    //Carregar lista de produtores
    getProducers: async () => {
        try {
            const request = await fetch(`${BASE.API}/produtor`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getProducers ' + e)
        }
    },

    //Carregar lista de laticínios
    getDairies: async () => {
        try {
            const request = await fetch(`${BASE.API}/laticinio`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getDairies ' + e)
        }
    },

    //Carregar lista de responsáveis
    getResponsibles: async () => {
        try {
            const request = await fetch(`${BASE.API}/responsavel`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getResponsibles ' + e)
        }
    },
}

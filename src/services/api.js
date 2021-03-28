import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE from './base'

const setRole = (role) => {
    if (role === 1) return 'produtor'
    else if (role === 2) return 'responsavel'
    else if (role === 3) return 'laticinio'
    else if (role === 4) return 'tecnico'
    else return
}

export default {

    checkToken: async () => { },

    onSignIn: async (email, password) => {
        try {
            const request = await fetch(`${BASE.API}/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            return request

        } catch (e) {
            console.log('Error: onSignIn ' + e)
        }
    },

    getGeneric: async (link) => {
        try {
            const request = await fetch(`${BASE.API}/${link}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getGeneric ' + e)
        }
    },

    getUser: async () => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const request = await fetch(`${BASE.API}/${setRole(user.perfil)}/${user.id}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Error: getUser ' + e)
        }
    },

    editUser: async (
        nome, apelido, cep, localidade, uf, bairro, logradouro, complemento
    ) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                nome: nome,
                apelido: apelido,
                cep: cep,
                localidade: localidade,
                uf: uf,
                bairro: bairro,
                logradouro: logradouro,
                complemento: complemento
            }

            await fetch(`${BASE.API}/${setRole(user.perfil)}/${user.id}`,
                {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(data)
                }
            )
        } catch (e) {
            console.log('Error: editUser ' + e)
        }
    },

    //Pega a lista de tanques
    getTanks: async () => {
        try {
            const request = await fetch(`${BASE.API}/tanque`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getTanks ' + e)
        }
    },

    getCep: async (cep) => {
        try {
            const request = await fetch(`${BASE.CEP_API}/${cep}/json`)
            return request
        } catch (e) {
            console.log('Erro: getCep ' + e)
        }
    }
}
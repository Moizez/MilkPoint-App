import AsyncStorage from '@react-native-community/async-storage'
import BASE from './base'

const setRole = (role) => {
    if (role == 1) return 'produtor'
    else if (role == 2) return 'responsavel'
    else if (role == 3) return 'laticinio'
    else return 'tecnico'
}

export default {

    checkToken: async () => { },

    onSignIn: async (email, password) => {
        const request = await fetch(`${BASE.API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        return request
    },

    getUser: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/${setRole(user.perfil)}/${user.id}`)
        const response = await request.json()
        return response
    },

    updateUser: async (nome, apelido, email, cep, localidade, uf, bairro, logradouro, complemento) => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/${setRole(user.perfil)}/${user.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: user.id,
                nome: nome,
                apelido: apelido,
                email: email,
                cep: cep,
                localidade: localidade,
                uf: uf,
                bairro: bairro,
                logradouro: logradouro,
                complemento: complemento
            })
        })
        return request
    },

    //Pega a lista de tanques
    getTanks: async () => {
        const request = await fetch(`${BASE.API}/tanque`)
        const response = await request.json()
        return response
    },

    setTank: async () => {
        const request = await fetch(`${BASE.API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const response = await request.json()
        return response
    },

    updateTank: async () => {

    },

    getCep: async (cep) => {
        const request = await fetch(`${BASE.CEP_API}/${cep}/json`)
        return request
    }
}
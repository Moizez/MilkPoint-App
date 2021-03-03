import AsyncStorage from '@react-native-community/async-storage'

const BASE_API = 'https://milkpoint.serviceapp.net.br/api'
const CEP_API = 'https://viacep.com.br/ws'
//const BASE_API  = 'http://192.168.0.128:8080/api/'
//const BASE_API  = 'https://milkpoint.herokuapp.com/api/'

const setRole = (role) => {
    if (role == 1) return 'produtor'
    else if (role == 2) return 'responsavel'
    else if (role == 3) return 'laticinio'
    else return 'tecnico'
}

export default {
    checkToken: async () => { },

    onSignIn: async (email, password) => {
        const request = await fetch(`${BASE_API}/login`, {
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

        const request = await fetch(`${BASE_API}/${setRole(user.perfil)}/${user.id}`)
        const response = await request.json()
        return response
    },

    updateUser: async (nome, apelido, email, cep, localidade, uf, bairro, logradouro, complemento) => {
        const user = JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE_API}/login`, {
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

    //REQUISIÇÕES DO TANQUE
    //Pega a lista de tanques
    getTanks: async () => {
        const request = await fetch(`${BASE_API}/tanque`)
        const response = await request.json()
        return response
    },

    getCep: async (cep) => {
        const request = await fetch(`${CEP_API}/${cep}/json`)
        return request
    }
}

import AsyncStorage from '@react-native-community/async-storage'

const BASE_API = 'https://milkpoint.serviceapp.net.br/api'
const CEP_API = 'https://viacep.com.br/ws/'
//const BASE_API  = 'http://192.168.0.128:8080/api/'
//const BASE_API  = 'https://milkpoint.herokuapp.com/api/'

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

    //REQUISIÇÕES DO TANQUE
    //Pega a lista de tanques
    getTanks: async () => {
        const request = await fetch(`${BASE_API}/tanque`)
        const response = await request.json()
        return response
    },
}

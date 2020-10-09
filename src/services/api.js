import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://192.168.0.128:8080/api/',
    baseURL: 'https://milkpoint.herokuapp.com/api/'
    //baseURL: 'https://milkpointapi.cfapps.io/api/'
})

export default api
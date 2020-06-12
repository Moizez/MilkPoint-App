import axios from 'axios'

//"baseUrl": "http://milkpoint.herokuapp.com/",
const api = axios.create({
    "baseUrl": "http://milkpoint.herokuapp.com/api/",
})

export default api
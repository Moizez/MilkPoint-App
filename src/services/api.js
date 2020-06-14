import axios from 'axios'

//"baseUrl": "https://milkpoint.herokuapp.com/api",
const api = axios.create({
    "baseUrl": "https://milkpoint.herokuapp.com/api/",
})

export default api
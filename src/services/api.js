import axios from 'axios'

const api = axios.create({
    baseUrl: "https://milkpoint.herokuapp.com/api/",
})

export default api
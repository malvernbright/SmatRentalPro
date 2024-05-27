import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // if(config.data instanceof FormData){
    //     config.headers.Authorization = `Bearer ${token}`
    //     config.headers.setContentType("multipart/form-data");
    //     // config.headers = {
    //     //     ...config.headers,
    //     //     "Content-Type": "multipart/form-data"
    //     // }
    // }
    return config
},
    (error) => {
        Promise.reject(error)
    }
)

export default api;
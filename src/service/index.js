import axios from "axios";
import * as employeeApi from './employeeApi'
import * as dictionaryApi from './dictionaryApi'
import * as userApi from './userApi'

const $ = axios.create({
    baseURL: '/api',
    timeout: 1000,
})

$.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

$.interceptors.response.use((response) => {
    return response.data
}, (error => {
    return Promise.reject(error)
}))

export {
    $,
    axios,
    employeeApi,
    dictionaryApi,
    userApi
}

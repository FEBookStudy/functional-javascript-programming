import axios, { type AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
})

export { axiosInstance }

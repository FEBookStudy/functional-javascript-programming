import axios, { type AxiosInstance } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: '/common',
  headers: {
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded',
  },
})

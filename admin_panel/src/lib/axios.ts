import axios, {  AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { MainUrl } from '../api/base/config'

const apiAxios = axios.create({
   baseURL: MainUrl,
   timeout: 1000,
   headers: { 'Content-Type': 'application/json' ,Accept:'application/json'}
})

axios.interceptors.request.use((config:InternalAxiosRequestConfig )=>{
   const token = localStorage.getItem('token')
   if(token){
      config.headers.set('Authoriation',`Bearer ${token}`)
        
   }
   if(import.meta.env.DEV){
      console.log(`[Api request] ${config.method?.toUpperCase()} ${config.url}`,config)
   }
   return config},
   (error:AxiosError)=>{
      return Promise.reject(error)
   }
)
export default apiAxios
import axios from 'axios'
import env from './env'

const baseUrl = env === 'production' ? '/' : 'http://localhost:5000/api/'

export const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
})
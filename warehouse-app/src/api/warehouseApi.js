import axios from 'axios'

export const warehouseApi = axios.create({
  baseURL: 'http://localhost:5000/api/warehouse',
  headers: {
    'Content-Type': 'application/json'
  }
})
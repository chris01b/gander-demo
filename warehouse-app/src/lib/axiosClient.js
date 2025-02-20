import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5000/api/warehouse',
  headers: {
    'Content-Type': 'application/json'
  }
})
import axios from 'axios'
import { useState, useEffect } from 'react'

export default axios.create({
  baseURL: 'http://localhost:5000/api/client',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Simple polling mechanism
const useRequestRefresh = (interval = 10000) => {
  const [refreshCount, setRefreshCount] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCount(prev => prev + 1)
    }, interval)
    
    return () => clearInterval(timer)
  }, [interval])

  return refreshCount
}
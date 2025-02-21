import { useEffect, useState } from 'react'
import RequestQueue from './features/fulfillment/RequestQueue'
import { warehouseApi } from './api/warehouseApi'

export default function App() {
  const [requests, setRequests] = useState([])
  
  const refreshRequests = async () => {
    try {
      const response = await warehouseApi.get('/requests')
      setRequests(response.data)
    } catch (error) {
      console.error('Error fetching requests:', error)
    }
  }

  useEffect(() => {
    refreshRequests()
    const interval = setInterval(refreshRequests, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-orange-600">Warehouse Fulfillment</h1>
      </nav>
      
      <main className="p-4 max-w-7xl mx-auto">
        <RequestQueue 
          requests={requests} 
          onStatusChange={refreshRequests}
        />
      </main>
    </div>
  )
}
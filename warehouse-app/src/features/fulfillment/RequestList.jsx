import { useEffect, useState } from 'react'
import { warehouseAPI } from '../../lib/api'

export default function RequestList() {
  const [requests, setRequests] = useState([])
  
  const refreshRequests = async () => {
    try {
      const response = await warehouseAPI.get('/requests')
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
    <div className="space-y-4">
      {requests.map(request => (
        <RequestCard key={request.id} request={request} refresh={refreshRequests} />
      ))}
    </div>
  )
}
import { useEffect, useState } from 'react'
import { clientApi } from '../../api/clientApi'

export default function RequestList() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await clientApi.get('/requests')
        setRequests(response.data)
      } catch (error) {
        console.error('Failed to load requests:', error)
      }
    }
    loadRequests()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Your Requests</h2>
      {requests.map(request => (
        <div key={request.id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{request.part_number}</h3>
              <p className="text-sm text-gray-600">{request.aircraft_type}</p>
            </div>
            <span className={`badge ${STATUS_COLORS[request.status]}`}>
              {request.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

const STATUS_COLORS = {
  open: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  closed: 'bg-green-100 text-green-800'
}
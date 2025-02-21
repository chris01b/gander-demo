import { useEffect, useState } from 'react'
import { clientApi } from '../../api/clientApi'

export default function RequestList() {
  const [requests, setRequests] = useState([])
  const [closedRequests, setClosedRequests] = useState([])

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await clientApi.get('/requests')
        const allRequests = response.data
        const openOrInProgress = allRequests.filter((r) => 
          r.status === 'open' || r.status === 'in-progress'
        )
        const closed = allRequests.filter((r) => r.status === 'closed')
        setRequests(openOrInProgress)
        setClosedRequests(closed)
      } catch (error) {
        console.error('Failed to load requests:', error)
      }
    }
    loadRequests()
  }, [])

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await clientApi.patch(`/requests/${requestId}/status`, { status: newStatus });
      // Refresh both lists
      const response = await clientApi.get('/requests');
      const allRequests = response.data;
      setRequests(allRequests.filter(r => 
        r.status === 'open' || r.status === 'in-progress'
      ));
      setClosedRequests(allRequests.filter(r => r.status === 'closed'));
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Your Requests</h2>

      {/* Open / In-Progress */}
      <h3 className="font-medium text-gray-700 mb-2">Open / In Progress</h3>
      {requests.map((request) => (
        <div key={request.id} className="bg-white p-4 rounded shadow mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{request.part_number}</h3>
              <p className="text-sm text-gray-600">{request.aircraft_type}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge ${STATUS_COLORS[request.status]}`}>
                {request.status}
              </span>
              {request.status === 'open' && (
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(request.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="open">Open</option>
                  <option value="closed">Close</option>
                </select>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Closed */}
      <h3 className="font-medium text-gray-700 mt-6 mb-2">Closed Requests</h3>
      {closedRequests.map((request) => (
        <div key={request.id} className="bg-white p-4 rounded shadow mb-2">
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
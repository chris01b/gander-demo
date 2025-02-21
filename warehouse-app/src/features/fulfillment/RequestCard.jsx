import { useState } from 'react'
import axios from 'axios'

export default function RequestCard({ request, refresh }) {
  const [status, setStatus] = useState(request.status)

  const updateStatus = async (newStatus) => {
    try {
      await axios.patch(`/api/warehouse/requests/${request.id}/status`, {
        status: newStatus
      })
      setStatus(newStatus)
      refresh()
    } catch (error) {
      console.error('Status update failed:', error)
    }
  }

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{request.part_number}</h3>
          <p className="text-sm text-gray-600">{request.aircraft_type}</p>
          <p className="text-sm">Qty: {request.quantity}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Close Request</option>
          </select>
        </div>
      </div>
      
      {request.description && (
        <p className="mt-2 text-sm text-gray-700">{request.description}</p>
      )}
    </div>
  )
}
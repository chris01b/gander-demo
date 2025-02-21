import { useState } from 'react'
import PropTypes from 'prop-types'
import { warehouseApi } from '../../api/warehouseApi'

export default function RequestCard({ request, refresh }) {
  const [status, setStatus] = useState(request.status)

  const updateStatus = async (newStatus) => {
    try {
      await warehouseApi.patch(`/requests/${request.id}/status`, {
        status: newStatus
      })
      setStatus(newStatus)
      refresh()
    } catch (error) {
      console.error('Status update failed:', error)
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{request.part_number}</h3>
          <p className="text-sm text-gray-600">Aircraft: {request.aircraft_type}</p>
          <p className="text-sm text-gray-600">Quantity: {request.quantity}</p>
        </div>
        <div className="flex items-center">
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      {request.description && (
        <p className="mt-2 text-sm text-gray-700">{request.description}</p>
      )}
      <p className="mt-2 text-xs text-gray-500">
        Requested on: {new Date(request.created_at).toLocaleString()}
      </p>
    </div>
  )
}

RequestCard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    part_number: PropTypes.string,
    aircraft_type: PropTypes.string,
    quantity: PropTypes.number,
    description: PropTypes.string,
    created_at: PropTypes.string
  }).isRequired,
  refresh: PropTypes.func.isRequired,
};
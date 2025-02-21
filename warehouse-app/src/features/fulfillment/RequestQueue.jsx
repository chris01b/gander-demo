import RequestCard from './RequestCard'
import PropTypes from 'prop-types'

export default function RequestQueue({ requests, onStatusChange }) {
  const openRequests = requests.filter(r => 
    r.status === 'open' || r.status === 'in-progress'
  )
  const closedRequests = requests.filter(r => r.status === 'closed')

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Active Requests</h2>
        {openRequests.length === 0 ? (
          <p className="text-gray-500">No active requests</p>
        ) : (
          openRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              refresh={onStatusChange}
            />
          ))
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Completed Requests</h2>
        {closedRequests.length === 0 ? (
          <p className="text-gray-500">No completed requests</p>
        ) : (
          closedRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              refresh={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  )
}

RequestQueue.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  onStatusChange: PropTypes.func.isRequired,
}
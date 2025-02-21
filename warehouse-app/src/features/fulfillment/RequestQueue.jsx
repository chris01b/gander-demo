import RequestCard from './RequestCard'
import PropTypes from 'prop-types'

export default function RequestQueue({ requests, onStatusChange }) {
  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <p className="text-gray-500">No open requests at the moment.</p>
      ) : (
        requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            refresh={onStatusChange}
          />
        ))
      )}
    </div>
  )
}

RequestQueue.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  onStatusChange: PropTypes.func.isRequired,
}
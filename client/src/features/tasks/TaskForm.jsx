import { useState } from 'react'
import PropTypes from 'prop-types'
import axiosClient from '../../lib/axiosClient'

export default function TaskForm({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    
    setSubmitting(true)
    try {
      await axiosClient.post('/tasks', { title })
      setTitle('')
      onSuccess() // Trigger the fetchTasks from parent
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Enter task..."
        disabled={submitting}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={submitting || !title.trim()}
      >
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

TaskForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}
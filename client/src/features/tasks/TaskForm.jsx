import { useState } from 'react'
import axiosClient from '../../lib/axiosClient'

export default function TaskForm() {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosClient.post('/tasks', { title })
      setTitle('')
    } catch (error) {
      console.error('Error creating task:', error)
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
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  )
}
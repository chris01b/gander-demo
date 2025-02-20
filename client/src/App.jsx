import { useState, useEffect } from 'react'
import axiosClient from './lib/axiosClient'
import TaskForm from './features/tasks/TaskForm'

function App() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosClient.get('/tasks')
        setTasks(response.data)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch tasks')
      }
    }
    fetchTasks()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      
      {/* Task Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New Task</h2>
        <TaskForm onSuccess={() => window.location.reload()} />
      </div>

      {/* Task List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <ul className="space-y-2">
          {tasks.map(task => (
            <li 
              key={task.id}
              className="p-2 border rounded hover:bg-gray-50"
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequestForm from './features/requests/RequestForm'
import RequestList from './features/requests/RequestList'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Aviation Parts Client</h1>
          <div className="space-x-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">New Request</a>
            <a href="/requests" className="text-gray-600 hover:text-blue-600">View Requests</a>
          </div>
        </nav>
        
        <main className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<RequestForm />} />
            <Route path="/requests" element={<RequestList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
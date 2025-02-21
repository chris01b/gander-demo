import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequestForm from './features/requests/RequestForm'
import RequestList from './features/requests/RequestList'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-bold text-blue-600">Aviation Parts Client</h1>
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
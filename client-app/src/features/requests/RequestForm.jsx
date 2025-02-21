import { useState } from 'react'
import axios from 'axios'

export default function RequestForm() {
  const [formData, setFormData] = useState({
    part_number: '',
    description: '',
    quantity: 1,
    aircraft_type: '',
    urgency: 'routine'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/client/requests', formData)
      // Add success feedback
    } catch (error) {
      console.error('Submission failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">Part Number *</label>
        <input
          type="text"
          required
          className="w-full p-2 border rounded"
          value={formData.part_number}
          onChange={(e) => setFormData({...formData, part_number: e.target.value})}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Aircraft Type</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.aircraft_type}
            onChange={(e) => setFormData({...formData, aircraft_type: e.target.value})}
          />
        </div>
        
        <div>
          <label>Urgency</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.urgency}
            onChange={(e) => setFormData({...formData, urgency: e.target.value})}
          >
            <option value="routine">Routine (72h)</option>
            <option value="expedited">Expedited (24h)</option>
            <option value="emergency">Emergency (4h)</option>
          </select>
        </div>
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit Request
      </button>
    </form>
  )
}

import { useState, useEffect, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const generateMockData = () => {
  const now = new Date()
  return Array.from({ length: 24 }, (_, i) => ({
    time: new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).toLocaleTimeString(),
    shipments: Math.floor(Math.random() * 100),
    deliveries: Math.floor(Math.random() * 80),
  }))
}

export default function RealTimeTracking() {
  const [data, setData] = useState(() => generateMockData())

  const updateData = useCallback(() => {
    setData(prevData => {
      const newData = [...prevData.slice(1), {
        time: new Date().toLocaleTimeString(),
        shipments: Math.floor(Math.random() * 100),
        deliveries: Math.floor(Math.random() * 80),
      }]
      return newData
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(updateData, 5000)
    return () => clearInterval(interval)
  }, [updateData])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 uppercase">Real-Time Shipment Tracking</h2>
      <div className="border-4 border-black p-4 bg-white">
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="shipments" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="deliveries" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  )
}

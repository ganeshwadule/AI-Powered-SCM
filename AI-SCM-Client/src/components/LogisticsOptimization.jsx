
import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const initialData = [
  { name: 'Truck', value: 400 },
  { name: 'Rail', value: 300 },
  { name: 'Ship', value: 200 },
  { name: 'Air', value: 100 },
]

export default function LogisticsOptimization() {
  const [data, setData] = useState(initialData)

  const optimizeLogistics = () => {
    setData(prevData =>
      prevData.map(item => ({
        ...item,
        value: Math.floor(item.value * (0.8 + Math.random() * 0.4)),
      }))
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 uppercase">Logistics Optimization</h2>
      <button
        onClick={optimizeLogistics}
        className="bg-black text-white px-4 py-2 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all mb-4"
      >
        Optimize Logistics
      </button>
      <div className="border-4 border-black p-4 bg-white">
        <PieChart width={800} height={400}>
          <Pie
            data={data}
            cx={400}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="black" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}

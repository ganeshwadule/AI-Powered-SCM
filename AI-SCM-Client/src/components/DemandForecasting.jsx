import React, { useState, useEffect, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import * as tf from '@tensorflow/tfjs'

const generateMockData = (length) => {
  const baseValue = 1000
  const trend = 0.05
  const seasonality = 0.2
  const noise = 0.1

  return Array.from({ length }, (_, i) => {
    const trendComponent = baseValue * (1 + trend * i / length)
    const seasonalComponent = trendComponent * (1 + seasonality * Math.sin(2 * Math.PI * i / 12))
    const randomNoise = seasonalComponent * (1 + (Math.random() - 0.5) * 2 * noise)
    return {
      month: `Month ${i + 1}`,
      demand: Math.round(randomNoise),
    }
  })
}

const DemandForecasting = () => {
  const [historicalData, setHistoricalData] = useState(() => generateMockData(24))
  const [forecast, setForecast] = useState([])

  const trainModel = useCallback(async (data) => {
    const model = tf.sequential()
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })

    const xs = tf.tensor2d(data.map((_, i) => [i]), [data.length, 1])
    const ys = tf.tensor2d(data, [data.length, 1])

    await model.fit(xs, ys, { epochs: 100 })

    return model
  }, [])

  const generateForecast = useCallback(async () => {
    const demandData = historicalData.map(d => d.demand)
    const model = await trainModel(demandData)

    const futurePredictions = Array.from({ length: 12 }, (_, i) => {
      const input = tf.tensor2d([[demandData.length + i]])
      const prediction = model.predict(input)
      return {
        month: `Month ${demandData.length + i + 1}`,
        demand: Math.round(prediction.dataSync()[0]),
      }
    })

    setForecast(futurePredictions)
  }, [historicalData, trainModel])

  useEffect(() => {
    generateForecast()
  }, [generateForecast])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 uppercase">AI-Powered Demand Forecasting</h2>
      <button
        onClick={generateForecast}
        className="bg-black text-white px-4 py-2 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all mb-4"
      >
        Generate Forecast
      </button>
      <div className="border-4 border-black p-4 bg-white">
        <LineChart width={800} height={400} data={[...historicalData, ...forecast]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="demand" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  )
}

export default DemandForecasting

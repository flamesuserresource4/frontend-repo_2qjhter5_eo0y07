import { useEffect, useMemo, useState } from 'react'

export default function Graph2D() {
  const [mode, setMode] = useState('custom')
  const [expression, setExpression] = useState('sin(x)')
  const [preset, setPreset] = useState('Sine Wave')
  const [range, setRange] = useState({ min: -6.283, max: 6.283 })
  const [points, setPoints] = useState(400)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const presets = [
    { name: 'Sine Wave', expression: 'sin(x)', range: [-2*Math.PI, 2*Math.PI] },
    { name: 'Parabola', expression: 'x**2', range: [-10, 10] },
    { name: 'Exponential', expression: 'exp(x)', range: [-2, 3] }
  ]

  useEffect(() => {
    if (mode === 'preset') {
      const p = presets.find(p => p.name === preset)
      if (p) {
        setExpression(p.expression)
        setRange({ min: p.range[0], max: p.range[1] })
      }
    }
  }, [mode, preset])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    setData(null)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/plot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression, x_min: Number(range.min), x_max: Number(range.max), points: Number(points) })
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Plot failed')
      const d = await res.json()
      setData(d)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const width = 800
  const height = 400
  const padding = 40

  const plot = useMemo(() => {
    if (!data) return null
    const xs = data.x
    const ys = data.y
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const validY = ys.filter(y => typeof y === 'number')
    const minY = validY.length ? Math.min(...validY) : -1
    const maxY = validY.length ? Math.max(...validY) : 1

    const xScale = x => padding + (x - minX) / (maxX - minX) * (width - 2*padding)
    const yScale = y => height - padding - (y - minY) / (maxY - minY || 1) * (height - 2*padding)

    const pointsPath = []
    for (let i=0;i<xs.length;i++) {
      const y = ys[i]
      if (typeof y !== 'number') continue
      const X = xScale(xs[i])
      const Y = yScale(y)
      pointsPath.push(`${X.toFixed(2)},${Y.toFixed(2)}`)
    }
    return { minX, maxX, minY, maxY, pointsPath: pointsPath.join(' ') }
  }, [data])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">2D Graph Visualization</h1>
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
              <select value={mode} onChange={e=>setMode(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="custom">Custom Function</option>
                <option value="preset">Function Presets</option>
              </select>
            </div>
            {mode === 'preset' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preset</label>
                <select value={preset} onChange={e=>setPreset(e.target.value)} className="w-full border rounded px-3 py-2">
                  {presets.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>
            ) : (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">f(x)</label>
                <input value={expression} onChange={e=>setExpression(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g., sin(x)" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">x min</label>
              <input type="number" value={range.min} onChange={e=>setRange(r=>({...r, min: e.target.value}))} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">x max</label>
              <input type="number" value={range.max} onChange={e=>setRange(r=>({...r, max: e.target.value}))} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
              <input type="number" min={50} max={2000} value={points} onChange={e=>setPoints(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex items-end">
              <button onClick={fetchData} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Plot</button>
            </div>
          </div>
          <div className="md:col-span-1 bg-blue-50 rounded p-3 text-sm text-blue-900">
            <p className="font-medium mb-1">Tips</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use x as the variable</li>
              <li>Functions: sin, cos, exp, log, sqrt</li>
              <li>Operators: + - * / ^</li>
            </ul>
          </div>
        </div>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        <div className="mt-6 overflow-x-auto">
          <svg width={width} height={height} className="bg-white border rounded">
            {/* axes */}
            <line x1={40} y1={height-40} x2={width-40} y2={height-40} stroke="#e5e7eb" />
            <line x1={40} y1={40} x2={40} y2={height-40} stroke="#e5e7eb" />
            {plot && (
              <>
                <polyline fill="none" stroke="#2563eb" strokeWidth="2" points={plot.pointsPath} />
                <text x={width-50} y={height-45} className="text-xs fill-gray-500">x</text>
                <text x={45} y={50} className="text-xs fill-gray-500">y</text>
              </>
            )}
          </svg>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'

export default function Calculator() {
  const [expression, setExpression] = useState('sin(x) + x^2')
  const [operation, setOperation] = useState('derivative')
  const [order, setOrder] = useState(1)
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = { expression, operation, order: Number(order) }
      if (operation === 'integral') {
        if (a !== '' && b !== '') {
          payload.a = Number(a); payload.b = Number(b)
        }
      }
      const res = await fetch(`${base}/api/calc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Calculation failed')
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Calculator</h1>
      <p className="text-gray-600 mb-6">Compute derivatives and integrals.</p>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Function f(x)</label>
          <input value={expression} onChange={e=>setExpression(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., sin(x) + x^2" />
          <p className="text-xs text-gray-500 mt-1">Use x as variable. Allowed ops: + - * / ^, functions like sin, cos, exp, log, sqrt.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Operation</label>
            <select value={operation} onChange={e=>setOperation(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="derivative">Derivative</option>
              <option value="integral">Integral</option>
            </select>
          </div>
          {operation === 'derivative' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input type="number" min={1} value={order} onChange={e=>setOrder(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          )}
          {operation === 'integral' && (
            <div className="sm:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lower bound a (optional)</label>
                <input value={a} onChange={e=>setA(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upper bound b (optional)</label>
                <input value={b} onChange={e=>setB(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
            </div>
          )}
        </div>
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded">{loading? 'Calculating...' : 'Calculate'}</button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {result && (
        <div className="mt-6 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Result</h3>
          {result.result_expression && (
            <p className="font-mono text-sm break-all"><span className="text-gray-500">Expression:</span> {result.result_expression}</p>
          )}
          {typeof result.definite_value === 'number' && (
            <p className="font-mono text-sm break-all"><span className="text-gray-500">Value:</span> {result.definite_value}</p>
          )}
        </div>
      )}
    </section>
  )
}

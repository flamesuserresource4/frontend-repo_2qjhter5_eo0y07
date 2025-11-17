import { useEffect, useState } from 'react'

export default function Materials() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/materials`)
        if (!res.ok) throw new Error('Failed to fetch materials')
        const data = await res.json()
        setTopics(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMaterials()
  }, [])

  if (loading) return <p className="p-8">Loading...</p>
  if (error) return <p className="p-8 text-red-600">{error}</p>

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Calculus Materials</h1>
      <p className="text-gray-600 mb-8">Nine topics with explanations and examples.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(t => (
          <article key={t.slug} className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.title}</h3>
            <p className="text-gray-600 mb-3">{t.summary}</p>
            <details className="text-sm">
              <summary className="cursor-pointer text-blue-600">Read more</summary>
              <p className="mt-2 text-gray-700">{t.content}</p>
              <div className="mt-3 space-y-2">
                {t.examples?.map((ex, i) => (
                  <div key={i} className="bg-gray-50 rounded p-2">
                    <p className="font-medium">Example: {ex.problem}</p>
                    <p className="text-gray-700">Solution: {ex.solution}</p>
                  </div>
                ))}
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  )
}

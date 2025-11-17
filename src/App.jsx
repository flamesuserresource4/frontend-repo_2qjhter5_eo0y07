import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Materials from './components/Materials'
import Calculator from './components/Calculator'
import Graph2D from './components/Graph2D'

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Calculus Web</h1>
          <p className="mt-4 text-gray-600">Explore concise materials, compute derivatives and integrals, and visualize 2D graphs with custom functions or presets.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/materials" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Read Materials</Link>
            <Link to="/calculator" className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-black">Open Calculator</Link>
            <Link to="/graph" className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">Plot Graphs</Link>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-blue-100 to-purple-100 rounded-xl h-64 md:h-80 shadow-inner flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-700 font-medium">Multi-page Calculus Toolkit</p>
            <p className="text-gray-500 text-sm mt-1">Materials • Calculator • 2D Graphs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/graph" element={<Graph2D />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

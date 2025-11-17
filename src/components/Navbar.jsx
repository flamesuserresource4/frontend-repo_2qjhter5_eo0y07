import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors'
  const active = 'bg-blue-600 text-white'
  const inactive = 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500" />
            <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">Calculus Web</span>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/materials" className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}>Materials</NavLink>
            <NavLink to="/calculator" className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}>Calculator</NavLink>
            <NavLink to="/graph" className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}>2D Graph</NavLink>
            <a href="/test" className={`${linkBase} ${inactive}`}>Backend Test</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

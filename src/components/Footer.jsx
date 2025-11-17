export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white/60 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p>© {new Date().getFullYear()} Calculus Web. All rights reserved.</p>
          <div className="space-y-1">
            <p className="font-medium text-gray-700">Author</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Planned multi-page structure with Materials, Calculator, and 2D Graph.</li>
              <li>Implemented backend endpoints for materials, calculus operations, and plotting.</li>
              <li>Built frontend pages with Tailwind styling and interactive forms.</li>
              <li>Added function presets and custom input for graph visualization.</li>
              <li>Connected frontend to backend via environment-based API URL.</li>
            </ol>
          </div>
        </div>
      </div>
    </footer>
  )
}

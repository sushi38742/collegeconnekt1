import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-black text-[15px] tracking-tight text-[#1a1a1a]">
          CollegeConnekt
        </Link>
        <div className="flex items-center gap-5">
          <Link to="/login" className="hidden sm:block text-[13px] font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="text-[13px] font-medium bg-[#1a1a1a] text-white px-4 py-1.5 rounded-md hover:bg-[#2563eb] transition-colors">
            Get started
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-display font-800 text-[15px] tracking-tight text-[#1a1a1a]">
          CollegeConnekt
        </span>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-[13px] font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
          >
            Log in
          </a>
          <a
            href="#"
            className="text-[13px] font-medium bg-[#2563eb] text-white px-4 py-1.5 rounded-md hover:bg-[#1d4ed8] transition-colors"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  )
}

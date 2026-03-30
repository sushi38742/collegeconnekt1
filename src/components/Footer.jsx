export default function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] py-6 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#1a1a1a]">CollegeConnekt</span>

        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <p className="text-[12px] text-[#9ca3af]">© 2025 CollegeConnekt. All rights reserved.</p>
      </div>
    </footer>
  )
}

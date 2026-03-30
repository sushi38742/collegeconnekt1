import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-white text-[#1a1a1a]">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <Pricing />
      <Footer />
    </div>
  )
}

import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Features from './components/Features'
import FeatureShowcase from './components/FeatureShowcase'
import Partnerships from './components/Partnerships'
import Testimonials from './components/Testimonials'
import Resources from './components/Resources'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-white text-[#1a1a1a]">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <FeatureShowcase />
      <Partnerships />
      <Testimonials />
      <Resources />
      <Pricing />
      <Footer />
    </div>
  )
}

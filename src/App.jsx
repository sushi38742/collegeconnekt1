import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Features from './components/Features'
import FeatureShowcase from './components/FeatureShowcase'
import SplitFeatures from './components/SplitFeatures'
import Testimonials from './components/Testimonials'
import Resources from './components/Resources'
import Partnerships from './components/Partnerships'
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
      <SplitFeatures />
      <Testimonials />
      <Resources />
      <Partnerships />
      <Pricing />
      <Footer />
    </div>
  )
}

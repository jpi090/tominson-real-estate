import Navbar from '@/components/Navbar'
import Services from '@/components/Services'

export default function Service() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      </div>
      <Services />
    </div>
  )
}

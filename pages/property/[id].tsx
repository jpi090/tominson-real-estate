import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/real-estate-backend/api'

export default function PropertyDetails() {
  const router = useRouter()
  const { id } = router.query
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchProperty()
    }
  }, [id])

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`${API_URL}/properties.php`)
      const found = res.data.find((p: any) => p.id === parseInt(id as string))
      setProperty(found)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading property...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏘️</div>
          <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
          <button onClick={() => router.push('/property')} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Back to Properties
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <button onClick={() => router.back()} className="mb-6 text-primary hover:underline flex items-center">
          ← Back
        </button>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img 
                src={property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'} 
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
                }}
              />
            </div>
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
              <p className="text-gray-600 mb-6 flex items-center text-lg">
                <span className="mr-2">📍</span>
                {property.location}
              </p>
              <div className="text-4xl font-bold text-primary mb-8">${property.price}</div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🛏️</div>
                  <div className="font-bold text-lg">{property.beds}</div>
                  <div className="text-gray-600 text-sm">Bedrooms</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🚿</div>
                  <div className="font-bold text-lg">{property.baths}</div>
                  <div className="text-gray-600 text-sm">Bathrooms</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">📐</div>
                  <div className="font-bold text-lg">{property.sqft}</div>
                  <div className="text-gray-600 text-sm">Sqft</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-xl mb-4">Property Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">✓ Modern design and architecture</li>
                  <li className="flex items-center">✓ Prime location</li>
                  <li className="flex items-center">✓ High-quality finishes</li>
                  <li className="flex items-center">✓ Energy efficient</li>
                </ul>
              </div>

              <button className="w-full mt-8 bg-primary text-white py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

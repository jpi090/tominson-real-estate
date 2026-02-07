import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Properties from '@/components/Properties'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/real-estate-backend/api'

export default function Property() {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/properties.php`)
      setProperties(res.data)
    } catch (error) {
      console.error('Error fetching properties:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">All Properties</h1>
      </div>
      <Properties properties={properties} />
    </div>
  )
}

import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Properties from '@/components/Properties'
import Footer from '@/components/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/real-estate-backend/api'

export default function Home() {
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
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Properties properties={properties} />
      <Footer />
    </div>
  )
}

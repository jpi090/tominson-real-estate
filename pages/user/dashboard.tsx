import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Navbar from '@/components/Navbar'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/real-estate-backend/api'

export default function UserDashboard() {
  const router = useRouter()
  const [properties, setProperties] = useState([])
  const [bookings, setBookings] = useState([])
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBeds, setFilterBeds] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [activeTab, setActiveTab] = useState('browse')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    fetchProperties()
    fetchBookings(parsedUser.id)
  }, [])

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/properties.php`)
      setProperties(res.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchBookings = async (userId: number) => {
    try {
      const res = await axios.get(`${API_URL}/bookings.php?user_id=${userId}`)
      setBookings(res.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleBookProperty = async (propertyId: number) => {
    if (!user) return
    
    if (confirm('Do you want to book this property? It will be reserved for 7 days.')) {
      try {
        await axios.post(`${API_URL}/bookings.php`, {
          property_id: propertyId,
          user_id: user.id
        })
        alert('Property booked successfully! Valid for 7 days.')
        fetchProperties()
        fetchBookings(user.id)
        setActiveTab('booked')
      } catch (error: any) {
        alert(error.response?.data?.message || 'Booking failed')
      }
    }
  }

  const handleCancelBooking = async (bookingId: number) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`${API_URL}/bookings.php?id=${bookingId}`)
        alert('Booking cancelled successfully!')
        fetchBookings(user.id)
        fetchProperties()
      } catch (error) {
        alert('Failed to cancel booking')
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )

  // Get booked property IDs
  const bookedPropertyIds = bookings
    .filter((b: any) => b.status === 'pending')
    .map((b: any) => b.property_id)

  // Filter and sort properties
  const filteredProperties = properties
    .filter((property: any) => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBeds = filterBeds === '' || property.beds.toString() === filterBeds
      return matchesSearch && matchesBeds
    })
    .sort((a: any, b: any) => {
      if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price)
      if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price)
      if (sortBy === 'newest') return b.id - a.id
      return 0
    })

  const activeBookings = bookings.filter((b: any) => b.status === 'pending')
  const expiredBookings = bookings.filter((b: any) => b.status === 'expired')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-red-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-red-100 mt-1">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => router.push('/')} className="bg-white bg-opacity-20 text-white px-6 py-2 rounded-lg hover:bg-opacity-30 transition font-semibold">
                🏠 Home
              </button>
              <button onClick={() => router.push('/settings')} className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">
                ⚙️ Settings
              </button>
              <button onClick={handleLogout} className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available Properties</p>
                <p className="text-3xl font-bold text-gray-800">{properties.length}</p>
              </div>
              <div className="text-5xl">🏘️</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">My Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{activeBookings.length}</p>
              </div>
              <div className="text-5xl">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Filtered Results</p>
                <p className="text-3xl font-bold text-gray-800">{filteredProperties.length}</p>
              </div>
              <div className="text-5xl">🔍</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Expired</p>
                <p className="text-3xl font-bold text-gray-800">{expiredBookings.length}</p>
              </div>
              <div className="text-5xl">⏰</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-4 font-semibold transition ${activeTab === 'browse' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              🏘️ Browse Properties
            </button>
            <button
              onClick={() => setActiveTab('booked')}
              className={`px-6 py-4 font-semibold transition ${activeTab === 'booked' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              ✅ My Bookings ({activeBookings.length})
            </button>
          </div>
        </div>

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">🔍 Search & Filter</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Bedrooms</label>
                  <select
                    value={filterBeds}
                    onChange={(e) => setFilterBeds(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                  >
                    <option value="">All</option>
                    <option value="1">1 Bed</option>
                    <option value="2">2 Beds</option>
                    <option value="3">3 Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">🏘️</span>
                Available Properties ({filteredProperties.length})
              </h2>
              {filteredProperties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-500 text-lg">No properties found</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredProperties.map((property: any) => {
                    const isBooked = bookedPropertyIds.includes(property.id)
                    return (
                      <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
                        <div className="relative">
                          <img 
                            src={property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'} 
                            alt={property.title} 
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                            ${property.price}
                          </div>
                          {isBooked && (
                            <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              ✅ Booked by You
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                          <p className="text-gray-600 mb-4 flex items-center">
                            <span className="mr-2">📍</span>
                            {property.location}
                          </p>
                          <div className="flex justify-between items-center text-gray-600 text-sm border-t pt-4 mb-4">
                            <div className="flex items-center">
                              <span className="mr-1">🛏️</span>
                              <span>{property.beds}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1">🚿</span>
                              <span>{property.baths}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1">📐</span>
                              <span>{property.sqft} sqft</span>
                            </div>
                          </div>
                          {isBooked ? (
                            <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold cursor-not-allowed">
                              ✅ Already Booked
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleBookProperty(property.id)}
                              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                            >
                              📅 Book Property
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* Booked Tab */}
        {activeTab === 'booked' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-3xl mr-3">✅</span>
              My Bookings
            </h2>
            
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-600">Active Bookings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {activeBookings.map((booking: any) => (
                    <div key={booking.id} className="border-2 border-green-500 rounded-lg overflow-hidden">
                      <img 
                        src={booking.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'} 
                        alt={booking.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{booking.title}</h3>
                            <p className="text-gray-600">📍 {booking.location}</p>
                          </div>
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Active
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-primary mb-4">${booking.price}</p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-700">
                            ⏰ Expires: {new Date(booking.expiry_date).toLocaleDateString()} at {new Date(booking.expiry_date).toLocaleTimeString()}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Booked on: {new Date(booking.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                        >
                          ❌ Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expired Bookings */}
            {expiredBookings.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-600">Expired Bookings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {expiredBookings.map((booking: any) => (
                    <div key={booking.id} className="border rounded-lg overflow-hidden opacity-60">
                      <img 
                        src={booking.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'} 
                        alt={booking.title}
                        className="w-full h-48 object-cover grayscale"
                      />
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-600">{booking.title}</h3>
                            <p className="text-gray-500">📍 {booking.location}</p>
                          </div>
                          <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Expired
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Expired on: {new Date(booking.expiry_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeBookings.length === 0 && expiredBookings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-500 text-lg">No bookings yet</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Browse Properties
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/real-estate-backend/api'

export default function AdminDashboard() {
  const router = useRouter()
  const [properties, setProperties] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('properties')
  const [bookings, setBookings] = useState([])
  const [form, setForm] = useState({ title: '', location: '', price: '', beds: '', baths: '', sqft: '', image: '' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [stats, setStats] = useState({ totalProperties: 0, totalUsers: 0, totalAdmins: 0 })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth')
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/user/dashboard')
      return
    }
    setUser(parsedUser)
    fetchProperties()
    fetchUsers()
    fetchBookings()
  }, [])

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/properties.php`)
      setProperties(res.data)
      setStats(prev => ({ ...prev, totalProperties: res.data.length }))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users.php`)
      setUsers(res.data)
      const admins = res.data.filter((u: any) => u.role === 'admin').length
      setStats(prev => ({ ...prev, totalUsers: res.data.length, totalAdmins: admins }))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookings.php`)
      setBookings(res.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file)
    }
  }

  const handleImageFile = (file: File) => {
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
      setForm({ ...form, image: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/properties.php`, form)
      setForm({ title: '', location: '', price: '', beds: '', baths: '', sqft: '', image: '' })
      setImagePreview('')
      setImageFile(null)
      fetchProperties()
      alert('Property added successfully!')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to add property')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`${API_URL}/properties.php?id=${id}`)
        fetchProperties()
        alert('Property deleted successfully!')
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_URL}/users.php?id=${id}`)
        fetchUsers()
        alert('User deleted successfully!')
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-red-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-red-100 mt-1">Welcome back, {user.name}</p>
            </div>
            <div className="flex gap-3">
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Properties</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalProperties}</p>
              </div>
              <div className="text-5xl">🏘️</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
              </div>
              <div className="text-5xl">👥</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Admins</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalAdmins}</p>
              </div>
              <div className="text-5xl">👨‍💼</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-6 py-4 font-semibold transition ${activeTab === 'properties' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              🏘️ Properties
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-semibold transition ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              👥 Users
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-semibold transition ${activeTab === 'bookings' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              📅 Bookings ({bookings.filter((b: any) => b.status === 'pending').length})
            </button>
          </div>
        </div>

        {activeTab === 'properties' && (
          <>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">➕</span>
                Add New Property
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Property Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary" required />
                  <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary" required />
                </div>
                <input type="text" placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary" required />
                <div className="grid grid-cols-3 gap-4">
                  <input type="number" placeholder="Beds" value={form.beds} onChange={(e) => setForm({...form, beds: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary" required />
                  <input type="number" placeholder="Baths" value={form.baths} onChange={(e) => setForm({...form, baths: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary" required />
                  <input type="number" placeholder="Sqft" value={form.sqft} onChange={(e) => setForm({...form, sqft: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Property Image</label>
                  <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg p-8 text-center transition ${isDragging ? 'border-primary bg-red-50' : 'border-gray-300'}`}>
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                        <button type="button" onClick={() => { setImagePreview(''); setImageFile(null); setForm({...form, image: ''}) }} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full">✕</button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-6xl mb-4">📸</div>
                        <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="imageInput" />
                        <label htmlFor="imageInput" className="inline-block bg-primary text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-700">Choose Image</label>
                        <input type="text" placeholder="Or paste image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} className="mt-2 w-full p-2 border rounded" />
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg hover:bg-red-700 font-semibold">➕ Add Property</button>
              </form>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">📋 Properties List ({properties.length})</h2>
              {properties.length === 0 ? (
                <div className="text-center py-12"><div className="text-6xl mb-4">🏘️</div><p className="text-gray-500">No properties yet</p></div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {properties.map((property: any) => (
                    <div key={property.id} className="border rounded-lg overflow-hidden">
                      <img src={property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'} alt={property.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold mb-2">{property.title}</h3>
                        <p className="text-gray-600 mb-2">📍 {property.location}</p>
                        <p className="text-2xl font-bold text-primary mb-3">${property.price}</p>
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <span>🛏️ {property.beds}</span>
                          <span>🚿 {property.baths}</span>
                          <span>📐 {property.sqft}</span>
                        </div>
                        <button onClick={() => handleDelete(property.id)} className="w-full bg-red-600 text-white py-2 rounded">🗑️ Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">👥 Users ({users.length})</h2>
            {users.length === 0 ? (
              <div className="text-center py-12"><div className="text-6xl mb-4">👥</div><p className="text-gray-500">No users yet</p></div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: any) => (
                    <tr key={u.id} className="border-b">
                      <td className="px-6 py-4">{u.name}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>{u.role}</span></td>
                      <td className="px-6 py-4">{u.id !== user.id && <button onClick={() => handleDeleteUser(u.id)} className="text-red-600">Delete</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">📅 Bookings ({bookings.length})</h2>
            {bookings.length === 0 ? (
              <div className="text-center py-12"><div className="text-6xl mb-4">📅</div><p className="text-gray-500">No bookings yet</p></div>
            ) : (
              <div>
                {bookings.filter((b: any) => b.status === 'pending').length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-green-600">Active Bookings</h3>
                    <table className="w-full">
                      <thead className="bg-green-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.filter((b: any) => b.status === 'pending').map((booking: any) => (
                          <tr key={booking.id} className="border-b">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img src={booking.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100'} alt={booking.title} className="w-16 h-16 object-cover rounded mr-3" />
                                <div>
                                  <div className="font-bold">{booking.title}</div>
                                  <div className="text-sm text-gray-600">{booking.location}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium">{booking.user_name}</div>
                              <div className="text-sm text-gray-600">{booking.user_email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm">{new Date(booking.expiry_date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

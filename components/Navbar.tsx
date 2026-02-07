import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center">
              <span className="text-3xl mr-2">🏠</span>
              Tominson Real Estate
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-primary transition font-medium">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition font-medium">About</Link>
              <Link href="/service" className="text-gray-700 hover:text-primary transition font-medium">Service</Link>
              <Link href="/property" className="text-gray-700 hover:text-primary transition font-medium">Property</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition font-medium">Contact</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  href={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} 
                  className="text-gray-700 hover:text-primary transition font-medium"
                >
                  📊 Dashboard
                </Link>
                <Link 
                  href="/settings" 
                  className="text-gray-700 hover:text-primary transition font-medium"
                >
                  ⚙️ Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/property" className="text-gray-700 hover:text-primary transition font-medium">Browse</Link>
                <Link href="/auth" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-red-700 transition font-semibold">
                  Login / Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

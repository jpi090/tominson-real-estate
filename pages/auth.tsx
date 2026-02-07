import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/real-estate-backend/api'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/auth.php`, {
          action: 'login',
          email: formData.email,
          password: formData.password
        })
        
        if (res.data.success) {
          const userData = res.data.user
          localStorage.setItem('user', JSON.stringify(userData))
          
          if (userData.role === 'admin') {
            router.push('/admin/dashboard')
          } else {
            router.push('/user/dashboard')
          }
        } else {
          alert(res.data.message || 'Login failed')
        }
      } else {
        const res = await axios.post(`${API_URL}/auth.php`, {
          action: 'register',
          ...formData
        })
        
        if (res.data.success) {
          alert('Registration successful! Please login.')
          setIsLogin(true)
          setFormData({ name: '', email: '', password: '', role: 'user' })
        } else {
          alert(res.data.message || 'Registration failed')
        }
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-red-600 to-red-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="bg-white rounded-full p-4 shadow-2xl inline-block mb-4">
              <span className="text-5xl">🏠</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Tominson Real Estate</h1>
          <p className="text-red-100">Find your dream property in Nigeria</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 font-semibold transition-all ${
                isLogin 
                  ? 'text-primary border-b-2 border-primary bg-red-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 font-semibold transition-all ${
                !isLogin 
                  ? 'text-primary border-b-2 border-primary bg-red-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">👤</span>
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">📧</span>
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔒</span>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-primary transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLogin ? 'Login' : 'Create Account'
                )}
              </button>
            </form>

            {/* Toggle Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({ name: '', email: '', password: '', role: 'user' })
                }}
                className="text-primary hover:text-red-700 font-semibold transition"
              >
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
              </button>
            </div>

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm transition">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white text-sm">
          <p>© 2026 Tominson Real Estate Nigeria. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

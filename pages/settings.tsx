import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Navbar from '@/components/Navbar'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/real-estate-backend/api'

export default function Settings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: ''
  })
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setProfileForm({
      name: parsedUser.name,
      email: parsedUser.email
    })
  }, [])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_URL}/update-profile.php`, {
        user_id: user.id,
        name: profileForm.name,
        email: profileForm.email
      })
      
      if (res.data.success) {
        const updatedUser = { ...user, name: profileForm.name, email: profileForm.email }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        alert('Profile updated successfully!')
      } else {
        alert(res.data.message || 'Update failed')
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Update failed')
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    }
    
    try {
      const res = await axios.post(`${API_URL}/update-password.php`, {
        user_id: user.id,
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword
      })
      
      if (res.data.success) {
        alert('Password updated successfully!')
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        alert(res.data.message || 'Password update failed')
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Password update failed')
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      return
    }
    
    if (!confirm('This will permanently delete all your data. Are you absolutely sure?')) {
      return
    }
    
    try {
      await axios.delete(`${API_URL}/users.php?id=${user.id}`)
      localStorage.removeItem('user')
      alert('Account deleted successfully')
      router.push('/')
    } catch (error) {
      alert('Failed to delete account')
    }
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-4 sticky top-6">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">👤</span>
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
                    activeTab === 'password'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">🔒</span>
                  Password
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeTab === 'account'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">⚙️</span>
                  Account
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Role:</strong> {user.role === 'admin' ? '👨‍💼 Admin' : '👤 User'}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Your role cannot be changed
                      </p>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Account ID:</strong> #{user.id}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h4 className="font-semibold text-red-800 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-600 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                          onClick={handleDeleteAccount}
                          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                        >
                          Delete My Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

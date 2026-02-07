import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setForm({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-primary mb-2">Thank You!</h2>
              <p className="text-gray-600">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full p-3 border rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full p-3 border rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full p-3 border rounded h-32 focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded hover:bg-red-700 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

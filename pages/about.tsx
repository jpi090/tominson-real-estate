import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function About() {
  const team = [
    {
      name: 'David Tominson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: '15+ years in Nigerian real estate'
    },
    {
      name: 'Chioma Okafor',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Expert in luxury properties'
    },
    {
      name: 'Adebayo Williams',
      role: 'Property Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      bio: 'Specialist in residential'
    },
    {
      name: 'Fatima Ibrahim',
      role: 'Legal Advisor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Real estate law expert'
    }
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Our Mission',
      description: 'To make property ownership accessible and stress-free for all Nigerians, providing exceptional service and expert guidance throughout your real estate journey.'
    },
    {
      icon: '👁️',
      title: 'Our Vision',
      description: 'To be Nigeria\'s most trusted real estate platform, revolutionizing how people buy, sell, and manage properties with innovative technology and personalized care.'
    },
    {
      icon: '💎',
      title: 'Our Values',
      description: 'Integrity, transparency, and customer satisfaction drive everything we do. We believe in building lasting relationships based on trust and excellence.'
    }
  ]

  const achievements = [
    { number: '7+', label: 'Years Experience' },
    { number: '33+', label: 'Projects Delivered' },
    { number: '30+', label: 'Happy Customers' },
    { number: '5k+', label: 'Awards Won' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-red-700 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">About Tominson Real Estate</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Nigeria's trusted partner in finding the perfect property
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded in Nigeria with a passion for helping people find their dream homes, Tominson Real Estate has grown into a trusted name across Lagos, Abuja, Port Harcourt, and beyond. Our journey began with a simple belief: every Nigerian deserves a place to call home.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              With over 7 years of experience and 33+ successful projects across Nigeria, we've helped more than 30 families and businesses find their perfect property match. Our dedication to excellence has earned us 5,000+ industry awards and recognitions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We combine cutting-edge technology with personalized service to make your real estate experience seamless, transparent, and rewarding. From luxury apartments in Victoria Island to affordable homes in Lekki, we've got you covered.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" 
              alt="Modern house" 
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-xl">
              <p className="text-4xl font-bold">7+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition">
              <p className="text-5xl font-bold text-primary mb-2">{achievement.number}</p>
              <p className="text-gray-600 font-semibold">{achievement.label}</p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Drives Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our experienced Nigerian professionals are dedicated to helping you achieve your real estate goals
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Highlight */}
        <div className="bg-gradient-to-r from-primary to-red-700 rounded-2xl shadow-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose Tominson Real Estate?</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-8">
            <div>
              <div className="text-5xl mb-3">💰</div>
              <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
              <p className="text-red-100">Competitive rates and flexible payment options in Naira</p>
            </div>
            <div>
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-red-100">Every property meets our high standards</p>
            </div>
            <div>
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Process</h3>
              <p className="text-red-100">Quick and easy property transactions</p>
            </div>
            <div>
              <div className="text-5xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Full Insurance</h3>
              <p className="text-red-100">Comprehensive property protection</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Find Your Dream Property in Nigeria?</h2>
          <p className="text-gray-600 mb-8">Let our experienced team guide you through every step</p>
          <div className="flex justify-center gap-4">
            <a href="/property" className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg">
              Browse Properties
            </a>
            <a href="/contact" className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg hover:bg-red-50 transition font-semibold text-lg">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

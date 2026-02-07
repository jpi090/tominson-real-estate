import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Tominson Real Estate</h3>
            <p className="text-gray-400">Nigeria's trusted partner in finding the perfect property.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="/property" className="text-gray-400 hover:text-white">Properties</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Property Sales</li>
              <li className="text-gray-400">Quality Homes</li>
              <li className="text-gray-400">Fast Process</li>
              <li className="text-gray-400">Property Insurance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">📧 info@tominsonrealestate.ng</li>
              <li className="text-gray-400">📞 +234 800 123 4567</li>
              <li className="text-gray-400">📍 Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Tominson Real Estate Nigeria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

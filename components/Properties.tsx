interface Property {
  id: number
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: number
  image: string
}

export default function Properties({ properties }: { properties: Property[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Discover Your Perfect Property Match</h2>
          <p className="text-gray-600">Real-time Properties that will together more than 50 examples of specialized real estate.</p>
        </div>
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties available at the moment.</p>
            <p className="text-gray-400 mt-2">Check back soon for new listings!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'} 
                  alt={property.title} 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">📍 {property.location}</p>
                  <div className="text-2xl font-bold text-primary mb-4">${property.price}</div>
                  <div className="flex space-x-4 text-gray-600 text-sm">
                    <span>🛏️ {property.beds} Beds</span>
                    <span>🚿 {property.baths} Baths</span>
                    <span>📐 {property.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

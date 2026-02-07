interface PropertyCardProps {
  property: {
    id: number
    title: string
    location: string
    price: string
    beds: number
    baths: number
    sqft: number
    image: string
  }
  onDelete?: (id: number) => void
  showActions?: boolean
}

export default function PropertyCard({ property, onDelete, showActions = false }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'} 
          alt={property.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'
          }}
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ${property.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{property.title}</h3>
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
        {showActions && onDelete && (
          <button
            onClick={() => onDelete(property.id)}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  )
}

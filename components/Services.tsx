export default function Services() {
  const services = [
    { 
      title: 'Affordable Property Taxes', 
      desc: 'We hope you find a more home by offering a smart real estate experience',
      icon: '🏠'
    },
    { 
      title: 'Guaranteed Quality Homes', 
      desc: 'We hope you find a more home by offering a smart real estate experience',
      icon: '✓'
    },
    { 
      title: 'Fast and Easy Process', 
      desc: 'We hope you find a more home by offering a smart real estate experience',
      icon: '⚡'
    },
    { 
      title: 'Property Insurance', 
      desc: 'We hope you find a more home by offering a smart real estate experience',
      icon: '🛡️'
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600">Enhance your property listings and values with accurate and engaging solutions.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className={`p-8 rounded-lg transition-all hover:shadow-xl ${idx === 0 ? 'bg-primary text-white' : 'bg-white'}`}>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className={`text-xl font-bold mb-3 ${idx === 0 ? 'text-white' : 'text-gray-800'}`}>{service.title}</h3>
              <p className={idx === 0 ? 'text-white' : 'text-gray-600'}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

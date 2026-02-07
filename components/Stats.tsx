export default function Stats() {
  const stats = [
    { value: '30+', label: 'Satisfied Customer' },
    { value: '5k+', label: 'Award winning' },
    { value: '07+', label: 'Years of Experience' },
    { value: '33+', label: 'Projects Delivered' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Your Trusted Real Estate Advisors</h2>
            <p className="text-gray-600">Real-time Properties that will together more than 50 examples of specialized real estate that manage scripts in a way that best suits your company.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className={`p-6 rounded-lg transition-transform hover:scale-105 ${idx === 1 ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className={idx === 1 ? 'text-white' : 'text-gray-600'}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

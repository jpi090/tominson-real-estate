export default function Hero() {
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')"}}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">Find Your Dream Home in Nigeria</h1>
        <p className="text-xl text-white mb-8 max-w-2xl">Discover the perfect property in Lagos, Abuja, Port Harcourt and beyond</p>
        <div className="bg-white rounded-full shadow-2xl px-6 py-4 flex items-center max-w-2xl w-full">
          <input
            type="text"
            placeholder="Search by location, property type..."
            className="flex-1 outline-none px-4 text-lg"
          />
          <button className="bg-primary text-white p-4 rounded-full hover:bg-red-700 transition-all transform hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <div className="mt-8 flex space-x-4">
          <a href="/property" className="bg-primary text-white px-8 py-3 rounded-full hover:bg-red-700 transition font-semibold">
            Browse Properties
          </a>
          <a href="/contact" className="bg-white text-primary px-8 py-3 rounded-full hover:bg-gray-100 transition font-semibold">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

import { logo } from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col mt-10'>
      <nav className='flex justify-between items-center w-full mb-12'>
        <img src={logo} alt='summily_logo' className='w-28 object-contain' />
      </nav>

      <div className="text-center max-w-3xl mx-auto">
        <h1 className='text-5xl font-extrabold mb-6 leading-tight'>
          Summarize Articles with
          <span className='block bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent'>
            OpenAI GPT-4
          </span>
        </h1>
        <p className='text-lg text-gray-300 mb-10 max-w-2xl mx-auto'>
          Simplify your reading with <span className='text-orange-400 font-medium'>Summily</span>, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries in seconds.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-lg bg-gray-800 text-gray-200 font-medium hover:bg-gray-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </header>
  )
}

export default Hero

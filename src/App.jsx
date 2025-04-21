import Hero from './components/Hero'
import Demo from './components/Demo'
import Footer from './components/Footer'

import './App.css'

const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className='main'>
                <div className='gradient' />
            </div>

            <div className='app max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <Hero />
                <Demo />
                <Footer />
            </div>
        </div>
    )
}

export default App
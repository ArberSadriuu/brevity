import Hero from './components/Hero'
import Demo from './components/Demo'
import Footer from './components/Footer'

import './App.css'

const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-br from-orange-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
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
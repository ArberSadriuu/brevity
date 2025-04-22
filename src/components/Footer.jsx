import React from 'react'

const Footer = () => {
  return (
    <footer className="py-10 mt-16 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <span className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Brevity
          </span>
        </div>
        
        <p className="text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} Created by <a 
            href="https://www.linkedin.com/in/arbersadriu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            Arber Sadriu
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer 
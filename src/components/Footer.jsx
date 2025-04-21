import React from 'react'

const Footer = () => {
  return (
    <footer className="py-6 mt-10 border-t border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Summily. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
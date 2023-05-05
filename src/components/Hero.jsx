import { logo } from '../assets'

const Hero = () => {
    return (
      <header className='w-full flex justify-center items-center flex-col mt-10'>
      <nav className='flex justify-between items-center w-full mb-28'>
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />
      </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient '>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc text-red'>
      "We're updating this application, please try again later... :)"</h2>
    </header>
    )
}

export default Hero

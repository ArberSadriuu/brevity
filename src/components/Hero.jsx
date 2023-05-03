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
      <h2 className='desc'>
      "Streamline your reading experience with <span className='text-orange-300'>Summily</span>, the open-source article summarization tool that condenses lengthy articles into concise summaries."
      </h2>
    </header>
    )
}

export default Hero
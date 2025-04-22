# Brevity - AI Article Summarizer

Brevity is a modern web application that uses OpenAI's GPT-4 model to summarize articles. Simply paste an article URL, and Brevity will generate a concise summary for you.

## Features

- ✨ Modern UI with a sleek design
- 📝 Summarize any article from a URL
- 🔄 View and manage your summarization history
- 📱 Fully responsive design for all devices
- 🔒 Local storage for saving your summaries

## Tech Stack

- React.js
- Zustand for state management
- RapidAPI for article summarization
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- RapidAPI key for the Article Extractor and Summarizer API

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/brevity.git
   cd brevity
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your RapidAPI key:
   ```
   VITE_RAPID_API_ARTICLE_KEY=your_rapidapi_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## How to Use

1. Enter a URL of an article you want to summarize
2. Click the "Summarize" button
3. View the summary
4. Your summarized articles will be saved in the History tab

## License

MIT

## Acknowledgements

- [OpenAI](https://openai.com/) for the GPT model
- [RapidAPI](https://rapidapi.com/) for the article summarization API
- [React](https://reactjs.org/) for the frontend framework
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling 
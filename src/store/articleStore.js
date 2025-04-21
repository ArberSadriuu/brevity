import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY || '825aa7d587mshb453b4e062b0201p1eebc4jsn662e332c3c05';

export const useArticleStore = create(
  persist(
    (set, get) => ({
      articles: [],
      currentArticle: { url: '', summary: '' },
      isLoading: false,
      error: null,
      
      setCurrentArticle: (article) => set({ currentArticle: article }),
      updateUrl: (url) => set({ currentArticle: { ...get().currentArticle, url } }),
      
      // Add a new article to the store
      addArticle: (article) => {
        const updatedArticles = [article, ...get().articles];
        set({ 
          articles: updatedArticles,
          currentArticle: article
        });
      },
      
      // Delete an article from the store
      deleteArticle: (index) => {
        const newArticles = [...get().articles];
        newArticles.splice(index, 1);
        set({ articles: newArticles });
      },
      
      // Set loading state
      setLoading: (isLoading) => set({ isLoading }),
      
      // Set error state
      setError: (error) => set({ error }),
      
      // Clear the current article URL
      clearUrl: () => set({ 
        currentArticle: { ...get().currentArticle, url: '' } 
      })
    }),
    {
      name: 'article-storage', // name of the localStorage key
      partialize: (state) => ({ articles: state.articles }), // only persist articles
    }
  )
);

// Function to fetch article summary
export const fetchArticleSummary = async (articleUrl) => {
  const url = 'https://news-article-data-extract-and-summarization1.p.rapidapi.com/extract/';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': 'news-article-data-extract-and-summarization1.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: articleUrl
    })
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching article summary:', error);
    throw error;
  }
}; 
import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useArticleStore, fetchArticleSummary } from '../store/articleStore'

const Demo = () => {
    const [activeTab, setActiveTab] = useState("summarize")
    const [copied, setCopied] = useState("")
    
    // Get state and actions from Zustand store
    const { 
        articles, 
        currentArticle, 
        isLoading,
        error,
        setCurrentArticle,
        updateUrl,
        addArticle,
        deleteArticle,
        setLoading,
        setError,
        clearUrl
    } = useArticleStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Set loading state and clear any previous errors
        setLoading(true)
        setError(null)
        
        try {
            // Call the API function
            const result = await fetchArticleSummary(currentArticle.url)
            
            if (result) {
                // Create new article with result data
                const newArticle = { 
                    url: currentArticle.url, 
                    summary: result.summary || result.text || "No summary available"
                }
                
                // Add the article to our store
                addArticle(newArticle)
                
                // Clear the input field
                clearUrl()
            }
        } catch (err) {
            console.error('Error fetching summary:', err)
            setError({
                message: 'Failed to summarize article',
                error: err.message || 'Unknown error occurred'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl)
        navigator.clipboard.writeText(copyUrl)
        setTimeout(() => setCopied(false), 3000)
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    return (
        <section className='mt-16 w-full max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden p-6'>
            <div className="flex mb-6 border-b border-gray-700">
                <button 
                    className={`px-4 py-2 font-medium ${activeTab === "summarize" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-400 hover:text-gray-300"}`}
                    onClick={() => handleTabChange("summarize")}
                >
                    Summarize
                </button>
                <button 
                    className={`px-4 py-2 font-medium ${activeTab === "history" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-400 hover:text-gray-300"}`}
                    onClick={() => handleTabChange("history")}
                >
                    History ({articles.length})
                </button>
            </div>

            {activeTab === "summarize" && (
                <div className='flex flex-col w-full gap-4'>
                    <h2 className="text-xl font-bold mb-2">Paste your article URL</h2>
                    <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
                        <img
                            src={linkIcon}
                            alt='link_icon'
                            className='absolute left-0 my-2 ml-3 w-5'
                        />

                        <input
                            id='url-input'
                            type='url'
                            placeholder='Enter a URL'
                            value={currentArticle.url}
                            onChange={(e) => updateUrl(e.target.value)}
                            required
                            className='block w-full rounded-lg pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white'
                        />

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='absolute right-2.5 px-4 py-1.5 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Summarizing...' : 'Go'}
                        </button>
                    </form>

                    {/* Display Results */}
                    <div className='mt-8'>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <img src={loader} alt='loader' className='w-10' />
                                <p className="ml-2 text-gray-400">Generating summary...</p>
                            </div>
                        ) : error ? (
                            <div className='p-4 bg-red-900/30 border border-red-700 rounded-lg text-center'>
                                <p className='font-medium text-white mb-1'>
                                    Error processing your request
                                </p>
                                <p className='text-red-300 text-sm'>
                                    {error.error || "Please check the URL and try again."}
                                </p>
                            </div>
                        ) : (
                            currentArticle.summary && (
                                <div className='flex flex-col gap-3'>
                                    <div className="flex justify-between items-center">
                                        <h2 className='font-bold text-2xl'>
                                            Article <span className='bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent'>Summary</span>
                                        </h2>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <span className="mr-1">URL:</span>
                                            <p className="truncate max-w-xs">{currentArticle.url}</p>
                                        </div>
                                    </div>
                                    <div className='bg-gray-700 rounded-lg p-4 border border-gray-600'>
                                        <p className='text-gray-200 leading-relaxed'>{currentArticle.summary}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            {activeTab === "history" && (
                <div className='flex flex-col gap-3'>
                    <h2 className="text-xl font-bold mb-4">Your Summarized Articles</h2>
                    
                    {articles.length === 0 ? (
                        <p className="text-gray-400 text-center py-10">No article summaries yet. Try summarizing one!</p>
                    ) : (
                        <div className='grid gap-3 max-h-[500px] overflow-y-auto pr-2'>
                            {articles.map((item, index) => (
                                <div 
                                    key={`link-${index}`}
                                    className='bg-gray-700 rounded-lg p-3 border border-gray-600 hover:border-orange-500 transition-colors cursor-pointer'
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className='text-blue-400 font-medium text-sm truncate max-w-[80%]' onClick={() => setCurrentArticle(item)}>
                                            {item.url}
                                        </p>
                                        <div className="flex items-center space-x-2">
                                            <button className='p-1.5 bg-gray-600 rounded-md' onClick={() => handleCopy(item.url)}>
                                                <img 
                                                    src={copied === item.url ? tick : copy} 
                                                    alt={copied === item.url ? 'tick_icon' : 'copy_icon'}
                                                    className='w-4 h-4 object-contain'
                                                />
                                            </button>
                                            <button 
                                                className='p-1.5 bg-gray-600 rounded-md text-gray-300 hover:bg-red-600 hover:text-white transition-colors'
                                                onClick={() => deleteArticle(index)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {item.url === currentArticle.url && (
                                        <div className="mt-2 pt-2 border-t border-gray-600">
                                            <p className="text-sm text-gray-300 line-clamp-3">{item.summary.substring(0, 150)}...</p>
                                            <button 
                                                className="text-xs text-orange-400 mt-1 hover:underline"
                                                onClick={() => { 
                                                    setCurrentArticle(item);
                                                    setActiveTab("summarize");
                                                }}
                                            >
                                                View full summary
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default Demo

import { useState } from 'react'
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
        
        if (!currentArticle.url.trim()) return;
        
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
        <section id="summarizer" className='my-16 w-full max-w-4xl mx-auto'>
            <div className="relative mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg blur opacity-25"></div>
                <div className="relative bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    {/* Tabs navigation */}
                    <div className="flex border-b border-gray-700">
                        <button 
                            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === "summarize" ? "text-orange-500 border-b-2 border-orange-500 bg-gray-800" : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"}`}
                            onClick={() => handleTabChange("summarize")}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                Summarize
                            </div>
                        </button>
                        <button 
                            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === "history" ? "text-orange-500 border-b-2 border-orange-500 bg-gray-800" : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"}`}
                            onClick={() => handleTabChange("history")}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                History ({articles.length})
                            </div>
                        </button>
                    </div>

                    {/* Tab content */}
                    <div className="p-6">
                        {activeTab === "summarize" && (
                            <div className='flex flex-col w-full gap-6'>
                                <div className="text-center mb-2">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent inline-block">
                                        Article Summarizer
                                    </h2>
                                    <p className="text-gray-400 mt-2">
                                        Paste any article URL and get a concise summary instantly
                                    </p>
                                </div>
                                
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <img src={linkIcon} alt="URL" className="w-5 h-5" />
                                        </div>
                                        <input
                                            id="url-input"
                                            type="url"
                                            value={currentArticle.url}
                                            onChange={(e) => updateUrl(e.target.value)}
                                            required
                                            className="block w-full pl-10 pr-28 py-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-400"
                                            placeholder="Enter article URL"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="absolute right-2.5 bottom-2.5 px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-500/30 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all"
                                        >
                                            {isLoading ? 'Summarizing...' : 'Summarize'}
                                        </button>
                                    </div>
                                </form>

                                {/* Results section */}
                                <div className="mt-4">
                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <img src={loader} alt="loading" className="w-10 h-10 mb-4" />
                                            <p className="text-gray-400">Generating your summary...</p>
                                        </div>
                                    ) : error ? (
                                        <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-6 text-center">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-900/30 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-red-400 mb-2">Error Processing Request</h3>
                                            <p className="text-sm text-gray-300">
                                                {error.error || "Please check the URL and try again."}
                                            </p>
                                        </div>
                                    ) : (
                                        currentArticle.summary && (
                                            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all">
                                                <div className="bg-gray-700/50 px-6 py-4 flex justify-between items-center">
                                                    <h3 className="font-bold text-lg text-white">
                                                        Summary Results
                                                    </h3>
                                                    <div className="flex items-center space-x-2">
                                                        <button 
                                                            onClick={() => handleCopy(currentArticle.summary)}
                                                            className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-md"
                                                            title="Copy summary"
                                                        >
                                                            <img 
                                                                src={copied === currentArticle.summary ? tick : copy} 
                                                                alt={copied === currentArticle.summary ? "Copied" : "Copy"} 
                                                                className="w-4 h-4" 
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <div className="text-xs text-gray-400 mb-2 flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                                        </svg>
                                                        <span className="truncate">{currentArticle.url}</span>
                                                    </div>
                                                    <div className="border-l-2 border-orange-500 pl-4 py-1">
                                                        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                                                            {currentArticle.summary}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "history" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">Your Summarized Articles</h2>
                                    {articles.length > 0 && (
                                        <button 
                                            onClick={() => {
                                                if (confirm("Are you sure you want to clear all history?")) {
                                                    for (let i = articles.length - 1; i >= 0; i--) {
                                                        deleteArticle(i);
                                                    }
                                                }
                                            }}
                                            className="text-sm text-gray-400 hover:text-red-400 flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            Clear history
                                        </button>
                                    )}
                                </div>
                                
                                {articles.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-600 mb-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>
                                        <p className="text-gray-400 mb-4">No article summaries yet</p>
                                        <button 
                                            onClick={() => setActiveTab("summarize")}
                                            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-500/30 transition-all"
                                        >
                                            Try summarizing one
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {articles.map((item, index) => (
                                            <div 
                                                key={`link-${index}`}
                                                className={`bg-gray-800 border rounded-lg overflow-hidden transition-all ${item.url === currentArticle.url ? 'border-orange-500' : 'border-gray-700 hover:border-gray-500'}`}
                                            >
                                                <div className="flex items-center justify-between px-4 py-3 bg-gray-700/30">
                                                    <div 
                                                        className="flex-1 cursor-pointer"
                                                        onClick={() => setCurrentArticle(item)}
                                                    >
                                                        <div className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                                            </svg>
                                                            <p className="text-blue-400 font-medium text-sm truncate">
                                                                {item.url}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2 ml-2">
                                                        <button 
                                                            className="p-1.5 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors" 
                                                            onClick={() => handleCopy(item.url)}
                                                            title="Copy URL"
                                                        >
                                                            <img 
                                                                src={copied === item.url ? tick : copy} 
                                                                alt={copied === item.url ? "Copied" : "Copy"} 
                                                                className="w-4 h-4" 
                                                            />
                                                        </button>
                                                        <button 
                                                            className="p-1.5 bg-gray-700 rounded-md text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                                                            onClick={() => deleteArticle(index)}
                                                            title="Delete"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {item.url === currentArticle.url && (
                                                    <div className="p-4 border-t border-gray-700">
                                                        <p className="text-sm text-gray-300 line-clamp-3">{item.summary.substring(0, 180)}...</p>
                                                        <button 
                                                            className="mt-2 text-xs text-orange-400 hover:text-orange-300 flex items-center"
                                                            onClick={() => { 
                                                                setCurrentArticle(item);
                                                                setActiveTab("summarize");
                                                            }}
                                                        >
                                                            <span>View full summary</span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ml-1">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Demo

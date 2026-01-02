import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

const SmartSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto -mt-8 relative z-20 px-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-primary w-5 h-5" />
                    <span className="text-sm font-semibold text-gray-700 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Smart Description Search
                    </span>
                </div>

                <form onSubmit={handleSearch} className="relative">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 text-gray-400 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Describe your problem (e.g., 'Reduce housekeeping turnover' or 'Guest mobile check-in')..."
                            className="w-full pl-14 pr-36 py-5 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg placeholder:text-gray-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-600 text-white px-6 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            Search <ArrowRight size={18} />
                        </button>
                    </div>
                </form>

                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 font-medium mr-2">Try searching:</span>
                    <button onClick={() => setQuery("Contactless check-in")} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors">
                        "Contactless check-in"
                    </button>
                    <button onClick={() => setQuery("Revenue management")} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors">
                        "Revenue management"
                    </button>
                    <button onClick={() => setQuery("Housekeeping app")} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors">
                        "Housekeeping app"
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartSearch;

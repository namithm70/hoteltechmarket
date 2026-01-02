import { useState } from 'react';
import axios from 'axios';
import { FileText, Sparkles, Check, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequirementsMatch = () => {
    const [requirements, setRequirements] = useState('');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleMatch = async () => {
        if (!requirements.trim()) return;

        setLoading(true);
        setSearched(true);
        try {
            // We can reuse the AI endpoint as it performs keyword/semantic-like matching
            const { data } = await axios.post('/api/ai/recommend', { query: requirements });
            setMatches(data.recommendations);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white py-16 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
                            Smart Match
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Paste Your Requirements
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Don't want to browse? Just copy and paste your project requirements, RFQ, or feature list below, and we'll analyze our database to find the perfect software match.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="p-2">
                            <textarea
                                className="w-full h-40 p-4 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 resize-none"
                                placeholder="Example: I need a cloud-based PMS that integrates with a channel manager, supports housekeeping mobile apps, and handles multi-property revenue management..."
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
                            <span className="text-sm text-gray-500">
                                {requirements.length > 0 ? `${requirements.length} characters` : 'Ready to analyze'}
                            </span>
                            <button
                                onClick={handleMatch}
                                disabled={!requirements.trim() || loading}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                                Find My Match
                            </button>
                        </div>
                    </div>

                    {/* Results Area */}
                    {searched && (
                        <div className="mt-12 animate-fade-in-up">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                {loading ? 'Analyzing...' : `We found ${matches.length} matches for your requirements`}
                            </h3>

                            <div className="grid grid-cols-1 gap-6">
                                {matches.map((product) => (
                                    <div key={product._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 relative overflow-hidden group">

                                        {/* Match Score Badge */}
                                        <div className="absolute top-0 right-0 bg-green-50 text-green-700 px-3 py-1 text-xs font-bold rounded-bl-lg border-l border-b border-green-100">
                                            Recommended
                                        </div>

                                        <div className="w-full md:w-48 h-32 md:h-auto bg-gray-100 rounded-lg flex-shrink-0">
                                            <img
                                                src={product.images[0] || 'https://via.placeholder.com/150'}
                                                alt={product.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                    {product.category}
                                                </span>
                                                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                    {product.productType}
                                                </span>
                                            </div>

                                            <Link to={`/product/${product._id}`} className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors mb-2 block">
                                                {product.title}
                                            </Link>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {product.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="font-bold text-gray-900">
                                                    ${product.price}
                                                </div>
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    className="text-purple-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                                >
                                                    View Details <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {!loading && matches.length === 0 && (
                                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
                                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <h3 className="text-lg font-medium text-gray-900">No exact matches found</h3>
                                        <p className="text-gray-500">Try rephrasing your requirements or browse by category.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RequirementsMatch;

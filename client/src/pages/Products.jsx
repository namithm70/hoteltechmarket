import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronRight, LayoutGrid, List } from 'lucide-react';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters State
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [productType, setProductType] = useState(searchParams.get('productType') || 'Software');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');

    // Constants
    const categories = [
        'Property Management Systems',
        'Point of Sale',
        'Revenue Management',
        'Guest Experience',
        'Security',
        'IoT',
        'Hardware'
    ];

    const productTypes = ['Software', 'Hardware'];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Build Query String
                const query = new URLSearchParams();
                if (category) query.append('category', category);
                if (productType) query.append('productType', productType);

                const { data } = await axios.get(`/api/products?${query.toString()}`);

                // Client-side search filtering (until API supports partial text search)
                let filteredData = data;
                if (searchQuery) {
                    const lowerQuery = searchQuery.toLowerCase();
                    filteredData = data.filter(product =>
                        product.name?.toLowerCase().includes(lowerQuery) ||
                        product.description?.toLowerCase().includes(lowerQuery) ||
                        product.category?.toLowerCase().includes(lowerQuery)
                    );
                }

                setProducts(filteredData);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, productType, searchQuery]);

    // Update URL when filters change
    useEffect(() => {
        const params = {};
        if (category) params.category = category;
        if (productType) params.productType = productType;
        if (searchQuery) params.search = searchQuery;
        setSearchParams(params);
    }, [category, productType, searchQuery, setSearchParams]);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Header / Breadcrumb */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {productType === 'Software' ? 'Software Solutions' : productType === 'Hardware' ? 'Hotel Hardware' : 'All Products'}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Home <ChevronRight size={14} className="inline" /> Products <ChevronRight size={14} className="inline" /> {productType}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                        {/* Type Filter */}
                        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Filter size={16} /> Filters
                            </h3>

                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Product Type</h4>
                                <div className="space-y-2">
                                    {productTypes.map((type) => (
                                        <label key={type} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="productType"
                                                checked={productType === type}
                                                onChange={() => setProductType(type)}
                                                className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">{type}</span>
                                        </label>
                                    ))}
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="productType"
                                            checked={productType === ''}
                                            onChange={() => setProductType('')}
                                            className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">All Types</span>
                                    </label>
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Categories</h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={category === ''}
                                            onChange={() => setCategory('')}
                                            className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">All Categories</span>
                                    </label>
                                    {categories.map((cat) => (
                                        <label key={cat} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={category === cat}
                                                onChange={() => setCategory(cat)}
                                                className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-600 truncate" title={cat}>{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow">
                        {/* Toolbar */}
                        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-bold text-gray-900">{products.length}</span> results
                            </div>

                            <div className="flex items-center gap-4">
                                <select
                                    className="border border-gray-300 rounded-md text-sm py-2 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>

                                <div className="flex border rounded-md overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'bg-white text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <LayoutGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'bg-white text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                    // Note: If List view is implemented differently, we'd pass a prop or use a different component.
                                    // For now, ProductCard handles grid well. For list view, we might need adjustments.
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
                                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                <p className="text-gray-500 mt-1">Try adjusting your filters or search criteria.</p>
                                <button
                                    onClick={() => { setCategory(''); setProductType(''); }}
                                    className="mt-4 text-primary font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, qty }));
        alert('Added to cart'); // Replace with toast later
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;
    if (!product) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-primary">Home</Link> /
                <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-primary mx-1">{product.category}</Link> /
                <span className="text-gray-800 font-medium ml-1">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Left Column: Images */}
                <div className="md:col-span-5">
                    <div className="bg-white border rounded-lg p-8 flex items-center justify-center mb-4 h-[400px]">
                        <img
                            src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400'}
                            alt={product.title}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    {/* Thumbnails (Mock) */}
                    <div className="flex gap-4 overflow-x-auto">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-20 h-20 border rounded cursor-pointer hover:border-primary p-2 flex items-center justify-center">
                                <img src={`https://via.placeholder.com/80?text=${i + 1}`} alt="thumb" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-7">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center text-accent">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="fill-current" />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">(12 Customer Reviews)</span>

                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                            In Stock
                        </span>
                    </div>

                    <div className="border-t border-b py-4 my-6">
                        <div className="text-3xl font-bold text-primary mb-1">
                            ${product.price}
                            {product.productType === 'Software' && <span className="text-sm text-gray-500 font-normal ml-1">/ {product.licenseType || 'license'}</span>}
                        </div>
                        <p className="text-sm text-gray-500">
                            Sold by: <Link to="/vendor/1" className="text-primary hover:underline font-medium">{product.vendor?.companyName || 'Vendor'}</Link>
                        </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg border mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <label className="font-medium text-gray-700">Quantity:</label>
                            <select
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                                className="border-gray-300 rounded-md shadow-sm p-2 w-20"
                            >
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            {product.productType === 'Software' && (
                                <button className="flex-1 bg-white border border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition">
                                    Start Free Trial
                                </button>
                            )}
                            {product.demoLink && (
                                <a
                                    href={product.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition flex items-center justify-center gap-2"
                                >
                                    View Live Demo
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Specifications Table */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4">Specifications</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 text-gray-500 w-1/3">Category</td>
                                    <td className="py-2 font-medium">{product.category}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 text-gray-500">Product Type</td>
                                    <td className="py-2 font-medium">{product.productType}</td>
                                </tr>
                                {product.productType === 'Hardware' && (
                                    <>
                                        <tr className="border-b">
                                            <td className="py-2 text-gray-500">Weight</td>
                                            <td className="py-2 font-medium">{product.shippingWeight} kg</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 text-gray-500">Dimensions</td>
                                            <td className="py-2 font-medium">{product.dimensions}</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            {[
                                'Cloud-based access from anywhere',
                                'Real-time analytics and reporting',
                                '24/7 Premium Support included',
                                'Easy integration with existing stack'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <Check size={18} className="text-green-500 mt-1" />
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

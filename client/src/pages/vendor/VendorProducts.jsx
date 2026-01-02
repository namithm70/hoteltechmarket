import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

const VendorProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchVendorProducts = async () => {
            try {
                // In a real app, this should be an authenticated endpoint that filters by the logged-in user
                // For now, we fetch all and filter client-side or assume the API handles it
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                // We need a specific endpoint for vendor products, or filter the main one
                // Let's assume we filter the main one for now as we didn't make a specific 'my-products' endpoint yet
                // Ideally backend should have /api/products/myproducts
                const { data } = await axios.get('/api/products', config); // This gets all public products currently

                // Client-side filter for MVP if API doesn't support 'my products' directly
                const myProducts = data.filter(p => p.vendor._id === user._id || p.vendor === user._id);
                setProducts(myProducts);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchVendorProducts();
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`/api/products/${id}`, config);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting product');
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading your products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
                <Link
                    to="/vendor/add-product"
                    className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {products.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        You haven't listed any products yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-900 border-b">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Product</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Type</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
                                                    {product.images && product.images[0] ? (
                                                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-900">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{product.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${product.productType === 'Software' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {product.productType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">${product.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/product/${product._id}`} className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50" title="View">
                                                    <Eye size={16} />
                                                </Link>
                                                <button className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-green-50" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorProducts;

import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Property Management Systems',
        productType: 'Software',
        // Software specific
        downloadLink: '',
        licenseType: 'Subscription',
        trialLink: '',
        demoLink: '',
        // Hardware specific
        stockCount: '0',
        shippingWeight: '',
        dimensions: ''
    });

    const categories = [
        'Property Management Systems',
        'Point of Sale',
        'Revenue Management',
        'Guest Experience',
        'Security',
        'IoT',
        'Hardware'
    ];

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('/api/products', formData, config);
            alert('Product created successfully!');
            navigate('/vendor/products');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error creating product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

            <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">

                {/* Basic Info */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                value={formData.title}
                                onChange={onChange}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                value={formData.description}
                                onChange={onChange}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                value={formData.price}
                                onChange={onChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                value={formData.category}
                                onChange={onChange}
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="productType"
                                        value="Software"
                                        checked={formData.productType === 'Software'}
                                        onChange={onChange}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-700">Software</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="productType"
                                        value="Hardware"
                                        checked={formData.productType === 'Hardware'}
                                        onChange={onChange}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-700">Hardware</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Type Specific Fields */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
                        {formData.productType === 'Software' ? 'Software Details' : 'Hardware Details'}
                    </h2>

                    {formData.productType === 'Software' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">License Type</label>
                                <select
                                    name="licenseType"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    value={formData.licenseType}
                                    onChange={onChange}
                                >
                                    <option value="Subscription">Subscription</option>
                                    <option value="Perpetual">Perpetual</option>
                                    <option value="Usage-based">Usage-based</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trial Link (Optional)</label>
                                <input
                                    type="text"
                                    name="trialLink"
                                    placeholder="https://"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    value={formData.trialLink}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo Link (Optional)</label>
                                <input
                                    type="text"
                                    name="demoLink"
                                    placeholder="https://"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    value={formData.demoLink}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Count</label>
                                <input
                                    type="number"
                                    name="stockCount"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    value={formData.stockCount}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Weight (kg)</label>
                                <input
                                    type="text"
                                    name="shippingWeight"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    value={formData.shippingWeight}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-6 border-t flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/vendor/products')}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddProduct;

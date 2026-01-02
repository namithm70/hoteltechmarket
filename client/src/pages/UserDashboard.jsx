import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package, Clock, AlertCircle, CheckCircle, Ticket, Shield } from 'lucide-react';

const UserDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchOrders();
        }
    }, [user, navigate]);

    const fetchOrders = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get('/api/orders/myorders', config);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (isPaid, isDelivered) => {
        if (isDelivered) return 'text-green-600 bg-green-100';
        if (isPaid) return 'text-blue-600 bg-blue-100';
        return 'text-yellow-600 bg-yellow-100';
    };

    const getStatusText = (isPaid, isDelivered) => {
        if (isDelivered) return 'Completed';
        if (isPaid) return 'Processing';
        return 'Pending Payment';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6 border-b pb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900">{user?.name}</h2>
                                <p className="text-xs text-gray-500">Customer Account</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Package size={18} /> My Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('warranties')}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'warranties'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Shield size={18} /> Warranties & Licenses
                            </button>
                            <button
                                onClick={() => setActiveTab('tickets')}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'tickets'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Ticket size={18} /> Support Tickets
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                            {loading ? (
                                <p>Loading orders...</p>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                                    <Link to="/products" className="text-primary hover:underline text-sm mt-2 inline-block">Start Shopping</Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
                                                <div className="flex gap-6 text-sm">
                                                    <div>
                                                        <span className="block text-gray-500 text-xs uppercase tracking-wider">Date Placed</span>
                                                        <span className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-gray-500 text-xs uppercase tracking-wider">Total Amount</span>
                                                        <span className="font-medium text-gray-900">${order.totalPrice.toFixed(2)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-gray-500 text-xs uppercase tracking-wider">Order ID</span>
                                                        <span className="font-medium text-gray-900">#{order._id.slice(-8).toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.isPaid, order.isDelivered)}`}>
                                                        {getStatusText(order.isPaid, order.isDelivered)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                {order.orderItems.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-4 mb-4 last:mb-0">
                                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
                                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900 hover:text-primary">
                                                                <Link to={`/product/${item.product}`}>{item.title}</Link>
                                                            </h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-sm text-gray-500">Qty: {item.qty}</span>
                                                                {/* Mock License Key Generation */}
                                                                {item.title.toLowerCase().includes('software') || item.title.toLowerCase().includes('license') ? (
                                                                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 flex items-center gap-1">
                                                                        <Shield size={10} /> License: XXXX-XXXX-XXXX
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="font-medium">${item.price}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-gray-50 px-6 py-3 border-t text-sm flex justify-end gap-3">
                                                <button className="text-primary hover:text-blue-800 font-medium hover:underline">View Invoice</button>
                                                <button className="text-primary hover:text-blue-800 font-medium hover:underline">Track Order</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Warranties Tab */}
                    {activeTab === 'warranties' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Warranties & Licenses</h2>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
                                <Shield className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-900 mb-2">My Software Licenses</h3>
                                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                    View and manage your active software licenses, download products, and check warranty status.
                                </p>
                                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                    Access License Manager
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tickets Tab */}
                    {activeTab === 'tickets' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Tickets</h2>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
                                <Ticket className="w-16 h-16 text-pink-200 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Need Help?</h3>
                                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                    Create a support ticket for any of your purchased products. Our vendors are here to help.
                                </p>
                                <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
                                    Create New Ticket
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

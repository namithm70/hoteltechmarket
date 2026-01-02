import { useState } from 'react';
import { Eye, Filter, Download } from 'lucide-react';

const VendorOrders = () => {
    // Mock Data for Orders - Replace with API call later
    const [orders, setOrders] = useState([
        {
            id: 'ORD-7782-XJ',
            customer: 'Grand Hotel Budapest',
            date: '2025-10-24',
            total: '$2,450.00',
            status: 'Completed',
            items: ['Cloud PMS - Pro License', 'Implementation Package'],
            paymentMethod: 'Credit Card'
        },
        {
            id: 'ORD-9921-MC',
            customer: 'Seaside Resort & Spa',
            date: '2025-10-23',
            total: '$149.00',
            status: 'Processing',
            items: ['Housekeeping Module Add-on'],
            paymentMethod: 'PayPal'
        },
        {
            id: 'ORD-1102-AB',
            customer: 'City Center Inn',
            date: '2025-10-22',
            total: '$850.00',
            status: 'Pending',
            items: ['POS Hardware Bundle'],
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 'ORD-3321-KL',
            customer: 'Mountain View Lodge',
            date: '2025-10-20',
            total: '$1,200.00',
            status: 'Cancelled',
            items: ['Revenue Management System'],
            paymentMethod: 'Credit Card'
        },
        {
            id: 'ORD-5543-PO',
            customer: 'Urban Boutique Hotel',
            date: '2025-10-18',
            total: '$3,100.00',
            status: 'Completed',
            items: ['Full Suite Integration', '24/7 Support Plan'],
            paymentMethod: 'Credit Card'
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 border-b">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Items</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{order.customer}</td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            {order.items.map((item, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded w-fit text-gray-700">{item}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-6 py-4 border-t flex justify-between items-center text-xs text-gray-500">
                    <span>Showing 1 to 5 of 5 entries</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 border-blue-200">1</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorOrders;

import { BarChart, DollarSign, Package, Users } from 'lucide-react';

const VendorDashboard = () => {
    // Mock Data
    const stats = [
        { label: 'Total Revenue', value: '$12,450', change: '+12%', icon: DollarSign, color: 'bg-green-100 text-green-600' },
        { label: 'Total Sales', value: '145', change: '+8%', icon: Package, color: 'bg-blue-100 text-blue-600' },
        { label: 'Active Products', value: '8', change: '0%', icon: Package, color: 'bg-indigo-100 text-indigo-600' },
        { label: 'Total Views', value: '3.2k', change: '+24%', icon: Users, color: 'bg-purple-100 text-purple-600' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 font-medium">{stat.change}</span>
                                <span className="text-gray-400 ml-2">from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders / Activity Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                    ORD
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">New Order #102{i}</h4>
                                    <p className="text-sm text-gray-500">Premium Cloud PMS subscription</p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;

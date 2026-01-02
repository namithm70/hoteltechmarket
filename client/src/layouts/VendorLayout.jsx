import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, PlusCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import clsx from 'clsx';

const VendorLayout = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navigation = [
        { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
        { name: 'My Products', href: '/vendor/products', icon: Package },
        { name: 'Add Product', href: '/vendor/add-product', icon: PlusCircle },
        { name: 'Orders', href: '/vendor/orders', icon: ShoppingBag },
        { name: 'Settings', href: '/vendor/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-blue-600">Vendor Portal</Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default VendorLayout;

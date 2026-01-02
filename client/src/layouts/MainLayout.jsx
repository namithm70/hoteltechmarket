import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Phone, Menu, ChevronDown, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../slices/authSlice';

const MainLayout = () => {
    const [isVendorMenuOpen, setIsVendorMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('/api/products/categories');
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Top Bar (Optional: typically for contact info) */}
            <div className="bg-gray-100 text-xs py-2 px-4 border-b hidden md:block">
                <div className="container mx-auto flex justify-between items-center text-gray-600">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Phone size={14} /> +1-800-HOTEL-TECH</span>
                        <span>support@hoteltechmarket.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/vendor/login">Vendor Login</Link>
                        <Link to="/help">Help Center</Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white sticky top-0 z-50 shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            HT
                        </div>
                        <span className="text-2xl font-bold text-primary tracking-tight">HotelTech<span className="text-secondary">Market</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <Link to="/products" className="hover:text-primary">Marketplace</Link>

                        <div className="relative group">
                            <button
                                className="flex items-center gap-1 hover:text-primary py-2"
                                onMouseEnter={() => setIsVendorMenuOpen(true)}
                                onMouseLeave={() => setIsVendorMenuOpen(false)}
                            >
                                Solutions <ChevronDown size={16} />
                            </button>
                            {/* Dropdown (Dynamic) */}
                            <div
                                className={clsx(
                                    "absolute top-full left-0 w-56 bg-white shadow-lg border rounded-lg p-2 transition-all duration-200 invisible opacity-0 group-hover:visible group-hover:opacity-100",
                                    "z-50"
                                )}
                            >
                                {categories.length > 0 ? (
                                    categories.map((cat, index) => (
                                        <Link
                                            key={index}
                                            to={`/products?category=${encodeURIComponent(cat)}`}
                                            className="block px-4 py-2 hover:bg-gray-50 text-sm rounded text-gray-700 capitalize"
                                        >
                                            {cat}
                                        </Link>
                                    ))
                                ) : (
                                    <span className="block px-4 py-2 text-sm text-gray-500">Loading...</span>
                                )}
                                <div className="border-t mt-2 pt-2">
                                    <Link to="/products" className="block px-4 py-2 hover:bg-gray-50 text-sm rounded text-primary font-semibold">View All Software</Link>
                                </div>
                            </div>
                        </div>

                        <Link to="/about" className="hover:text-primary">About</Link>
                        <Link to="/contact" className="hover:text-primary">Contact</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Icon (Mobile) */}
                        <button className="md:hidden text-gray-600">
                            <Search className="w-6 h-6" />
                        </button>

                        {/* Cart */}
                        <Link to="/cart" className="relative text-gray-600 hover:text-primary">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </Link>

                        {/* Auth Buttons */}
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 bg-gray-50 text-gray-700 hover:text-primary px-4 py-2 rounded-lg font-medium transition-colors border border-gray-200">
                                    <User className="w-4 h-4" />
                                    <span>{user.name}</span>
                                    <ChevronDown size={14} />
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg p-2 transition-all duration-200 invisible opacity-0 group-hover:visible group-hover:opacity-100 z-50">
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        to={user.role === 'vendor' ? '/vendor/dashboard' : '/dashboard'}
                                        className="block px-4 py-2 hover:bg-gray-50 text-sm rounded text-gray-700"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm rounded text-red-600 flex items-center gap-2"
                                    >
                                        <LogOut size={14} /> Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                                <User className="w-4 h-4" />
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden text-gray-600">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-bold mb-4">HotelTech<span className="text-secondary">Market</span></h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The comprehensive marketplace for hospitality technology. Discover, buy, and manage the best software to run your hotel operations efficiently.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Resources</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link to="/support" className="hover:text-white">Support Center</Link></li>
                            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Contact</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-center gap-2"><Phone size={16} /> +91 8075707353</li>
                            <li>65/1095A, Kassim Building, Sebastian Road, Kaloor-682017 Ernakulam, Kerala</li>
                            <li>info@hoteltechmarket.com</li>
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto px-4 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Hotel Tech Market. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset, logout } from '../slices/authSlice';
import { Store, Lock, Mail, ArrowLeft, LogOut, AlertTriangle } from 'lucide-react';

const VendorLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            // Toast would be better, but alert for MVP is okay, or render inline error
        }

        if (isSuccess || user) {
            // Check if user is actually a vendor
            if (user?.role === 'vendor' || user?.role === 'admin') {
                navigate('/vendor/dashboard');
            }
            // If not vendor, we stay on this page to show the "Unauthorized" UI defined below
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        };
        dispatch(login(userData));
    };

    // Render Unauthorized View if logged in but not vendor
    if (user && user.role !== 'vendor' && user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="max-w-md w-full bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20 relative z-10 text-center">
                    <div className="mx-auto h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                    <p className="text-gray-300 mb-6">
                        You are currently logged in as <strong>{user.name}</strong> (User), but this portal is reserved for Vendors.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                dispatch(logout());
                                navigate('/vendor/login');
                            }}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
                        >
                            <LogOut size={16} /> Logout & Switch Account
                        </button>
                        <Link to="/" className="block text-sm text-blue-400 hover:text-blue-300">
                            Return to Marketplace
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20 relative z-10">
                <div>
                    <Link to="/" className="inline-flex items-center text-blue-300 hover:text-white mb-6 text-sm transition-colors">
                        <ArrowLeft size={16} className="mr-1" /> Back to Market
                    </Link>
                    <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Store className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Vendor Portal
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        Manage your products and analytics
                    </p>
                </div>
                {isError && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm text-center">
                        {message}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative group">
                            <Mail className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 bg-slate-800 border border-slate-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                                placeholder="Vendor Email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 bg-slate-800 border border-slate-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                                placeholder="Password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
                        >
                            {isLoading ? 'Accessing Portal...' : 'Enter Dashboard'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            Not a vendor yet?{' '}
                            <Link to="/vendor/register" className="font-medium text-blue-400 hover:text-blue-300 underline">
                                Apply to sell
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorLogin;

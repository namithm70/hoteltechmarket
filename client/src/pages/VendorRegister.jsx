import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../slices/authSlice';
import { Store, User, Mail, Lock, Building, ArrowLeft } from 'lucide-react';

const VendorRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
    });

    const { name, email, password, companyName } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message); // Could use toast here
        }

        if (isSuccess || user) {
            // If registration successful, check role and redirect
            if (user?.role === 'vendor') {
                navigate('/vendor/dashboard');
            } else {
                // Should not happen for this form, but safety check
                navigate('/');
            }
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
            name,
            email,
            password,
            companyName,
            role: 'vendor', // Force vendor role
        };

        dispatch(register(userData));
    };

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
                    <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Store className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Become a Vendor
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        Start selling your hotel technology today.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div className="relative group">
                            <User className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                type="text"
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 bg-slate-800 border border-slate-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                                placeholder="Full Name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Building className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                type="text"
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 bg-slate-800 border border-slate-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                                placeholder="Company Name"
                                name="companyName"
                                value={companyName}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Mail className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                type="email"
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 bg-slate-800 border border-slate-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                type="password"
                                className="appearance-none rounded-lg relative block w-full px-10 py-3 bg-slate-800 border border-slate-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
                        >
                            {isLoading ? 'Creating Account...' : 'Register'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            Already have a vendor account?{' '}
                            <Link to="/vendor/login" className="font-medium text-blue-400 hover:text-blue-300 underline">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VendorRegister;

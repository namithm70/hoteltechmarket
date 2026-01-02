import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    ArrowRight,
    Play,
    CheckCircle,
    BarChart3,
    ShieldCheck,
    Globe,
    Zap,
    Users,
    CreditCard,
    LayoutDashboard,
    Truck,
    Smartphone
} from 'lucide-react';
import AIMatchmaker from '../components/AIMatchmaker';
import ProductCard from '../components/ProductCard';
import SmartSearch from '../components/SmartSearch';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Fetch products (assuming API supports basic filtering or we filter client side for now)
                // Using limit=4 if API supports it, otherwise slice
                const { data } = await axios.get('/api/products?productType=Software');
                setFeaturedProducts(data.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <div className="bg-background-2 overflow-x-hidden">

            {/* 1. HERO SECTION */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
                <div className="main-container relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Column: Content */}
                        <div className="max-w-2xl">
                            <div className="inline-block mb-6 animate-fade-in-up">
                                <span className="px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                                    HotelTechMarket Vision
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
                                The World’s Most Trusted <br />
                                <span className="text-primary">Hospitality Technology Hub</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Empowering every hotelier—regardless of technical expertise—to seamlessly discover, understand, and adopt the right digital solutions.
                            </p>

                            {/* Smart Prompt Search Mockup */}
                            <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-200 mb-8 max-w-lg">
                                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="text-primary"><ArrowRight size={20} className="rotate-45" /></div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400 font-medium mb-0.5">Smart Prompt Search</p>
                                        <p className="text-sm text-gray-700 italic">"Find software to reduce housekeeping delays..."</p>
                                    </div>
                                    <button className="bg-primary hover:bg-primary-600 text-white rounded-lg p-2 transition-colors">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                                <Link
                                    to="/products"
                                    className="px-8 py-4 rounded-full bg-[#8b5cf6] text-white font-medium text-lg hover:bg-[#7c3aed] transition-colors w-full sm:w-auto text-center"
                                >
                                    Start Discovery
                                </Link>
                                <Link to="/about" className="px-8 py-4 rounded-full border border-gray-300 text-gray-700 font-medium text-lg hover:bg-gray-50 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
                                    Read Our Mission
                                </Link>
                            </div>

                            <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                                <CheckCircle size={18} className="fill-green-100" />
                                <span>Guided Discovery. Operationally Relevant Terms.</span>
                            </div>
                        </div>

                        {/* Right Column: Image */}
                        <div className="relative">
                            <div className="relative z-10">
                                <img
                                    src="/images/hero-allbiz.png"
                                    alt="Hotel Manager Dashboard"
                                    className="w-full h-auto object-contain drop-shadow-2xl"
                                />
                            </div>
                            {/* Decorative Background Elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Smart Search Section (Just under Hero) */}
            <SmartSearch />

            {/* 2. VISION & MISSION SECTION */}
            <section className="py-20 bg-white border-y border-stroke-1">
                <div className="main-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Mission</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">Bridging the Gap Between Operations & Technology</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                We create an accessible, intuitive platform where hoteliers can:
                            </p>
                            <ul className="mt-6 space-y-4">
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <ArrowRight size={20} className="rotate-45" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Identify Solutions</h4>
                                        <p className="text-base text-gray-600">Through natural language prompts and guided discovery.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Learn & Evaluate</h4>
                                        <p className="text-base text-gray-600">In simple, operationally relevant terms without technical jargon.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Connect with Providers</h4>
                                        <p className="text-base text-gray-600">Find partners who understand real-world hospitality challenges.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-background-2 rounded-3xl p-8 border border-gray-100">
                            {/* Feature Highlights Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <span className="text-3xl mb-2 block">🤖</span>
                                    <h4 className="font-bold text-base">Smart Search</h4>
                                    <p className="text-sm text-gray-500 mt-1">"Why this matches my gap..."</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <span className="text-3xl mb-2 block">⭐</span>
                                    <h4 className="font-bold text-base">Trusted Reviews</h4>
                                    <p className="text-sm text-gray-500 mt-1">Verified user feedback</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <span className="text-3xl mb-2 block">📰</span>
                                    <h4 className="font-bold text-base">Tech News</h4>
                                    <p className="text-sm text-gray-500 mt-1">Stay informed on trends</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <span className="text-3xl mb-2 block">📝</span>
                                    <h4 className="font-bold text-base">Vendor EOI</h4>
                                    <p className="text-sm text-gray-500 mt-1">Easy listing workflow</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CATEGORIES GRID (Essential Solutions - Keeping this as is, just updating title if needed) */}
            <section className="py-24 bg-white border-y border-stroke-1">
                <div className="main-container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Essential Solutions</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                                Everything for your property
                            </h2>
                        </div>
                        <Link to="/products" className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                            View All Categories <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* PMS */}
                        <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">
                                <LayoutDashboard size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">PMS</h3>
                            <p className="text-gray-600 text-base mb-4">Property Management Systems to centralize operations.</p>
                            <Link to="/products?category=PMS" className="inline-flex items-center text-sm font-semibold text-blue-600 gap-1 hover:gap-2 transition-all">
                                Explore PMS <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* POS */}
                        <div className="p-8 rounded-3xl bg-purple-50/50 border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">
                                <CreditCard size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">POS</h3>
                            <p className="text-gray-600 text-base mb-4">Point of Sale for F&B, retail, and spa outlets.</p>
                            <Link to="/products?category=POS" className="inline-flex items-center text-sm font-semibold text-purple-600 gap-1 hover:gap-2 transition-all">
                                Explore POS <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Revenue */}
                        <div className="p-8 rounded-3xl bg-orange-50/50 border border-orange-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">
                                <BarChart3 size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Revenue</h3>
                            <p className="text-gray-600 text-base mb-4">RMS tools to optimize pricing and maximize RevPAR.</p>
                            <Link to="/products?category=Revenue" className="inline-flex items-center text-sm font-semibold text-orange-600 gap-1 hover:gap-2 transition-all">
                                Explore Revenue <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Guest Experience */}
                        <div className="p-8 rounded-3xl bg-green-50/50 border border-green-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Guest Exp.</h3>
                            <p className="text-gray-600 text-base mb-4">Apps for check-in, concierge, and feedback.</p>
                            <Link to="/products?category=Guest Experience" className="inline-flex items-center text-sm font-semibold text-green-600 gap-1 hover:gap-2 transition-all">
                                Explore Tools <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. NEW FEATURED MARKETPLACE SECTION */}
            <section className="py-24 bg-gray-50 border-y border-stroke-1">
                <div className="main-container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Software Marketplace</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                                Featured Software
                            </h2>
                            <p className="text-gray-600 mt-2">Top-rated solutions for your hotel operations.</p>
                        </div>
                        <Link to="/products?productType=Software" className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all btn btn-sm bg-white border border-gray-200 shadow-sm">
                            View All Software <ArrowRight size={18} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.length > 0 ? (
                                featuredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-4 text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
                                    <p className="text-gray-500">No software products found currently.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* 5. ECOSYSTEM (Refined for Features) */}
            <section className="py-24 bg-background-2">
                <div className="main-container">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Platform Features</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
                            A Complete <span className="text-blue-600">Discovery Engine</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            From AI-driven recommendations to direct vendor connection.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {/* Capability 1: Hotelier Portal / Search */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="bg-white p-2 rounded-3xl shadow-xl border border-gray-100 rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] relative group flex items-center justify-center">
                                        <ArrowRight size={64} className="text-gray-300" />
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 space-y-6">
                                <div className="w-12 h-12 bg-blue-100 text-primary rounded-xl flex items-center justify-center">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">Smart Prompt-Based Search</h3>
                                <p className="text-lg text-gray-600">
                                    Type your problem in plain English. Get recommended categories and products that solve your specific operational gap.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle size={20} className="text-green-500 flex-shrink-0" /> <span>Reasoning Engine ("Why this matches")</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle size={20} className="text-green-500 flex-shrink-0" /> <span>Gap Analysis Matching</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Capability 2: Vendor Workflow */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                                    <LayoutDashboard size={24} />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900">For Vendors: Seamless Listing</h3>
                                <p className="text-lg text-gray-600">
                                    Submit an Expression of Interest (EOI) to list your product. Manage leads and profile from a dedicated dashboard.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle size={20} className="text-purple-500 flex-shrink-0" /> <span>Simple EOI Form</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle size={20} className="text-purple-500 flex-shrink-0" /> <span>Track Approval Status</span>
                                    </li>
                                </ul>
                                <Link to="/vendor/register" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all cursor-pointer">
                                    Submit Vendor EOI <ArrowRight size={16} />
                                </Link>
                            </div>
                            <div className="">
                                <div className="bg-white p-2 rounded-3xl shadow-xl border border-gray-100 -rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] relative flex items-center justify-center">
                                        <Smartphone size={64} className="text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. STATS SECTION (Reliability) */}
            <section className="py-20 bg-white border-y border-stroke-1">
                <div className="main-container">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Engineered for <span className="text-primary">Reliability</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                            <div className="text-5xl font-extrabold text-primary mb-2">99.99%</div>
                            <div className="text-lg font-semibold text-gray-900 mb-2">Uptime Guarantee</div>
                            <p className="text-sm text-gray-500">For all hosted SaaS applications.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                            <div className="text-5xl font-extrabold text-primary mb-2">20+</div>
                            <div className="text-lg font-semibold text-gray-900 mb-2">Years Experience</div>
                            <p className="text-sm text-gray-500">In Hospitality Technology.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                            <div className="text-5xl font-extrabold text-primary mb-2">$500M+</div>
                            <div className="text-lg font-semibold text-gray-900 mb-2">Transaction Value</div>
                            <p className="text-sm text-gray-500">Processed annually.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PRICING SECTION (Membership Plans) */}
            <section className="py-24 bg-gray-50">
                <div className="main-container">
                    <div className="text-center mb-16">
                        <span className="badge bg-white shadow-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700">💰 Membership Plans</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-4">Scalable Pricing for Hotels</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Join the marketplace. Choose a plan that fits your property size.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Starter */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold text-gray-900">Boutique</h3>
                            <p className="text-gray-500 text-sm mt-1">For independent hotels</p>
                            <div className="my-6">
                                <span className="text-4xl font-bold text-gray-900">₹5,000</span>
                                <span className="text-gray-500">/mo</span>
                            </div>
                            <div className="bg-yellow-50 text-yellow-800 text-xs font-semibold px-3 py-1 rounded inline-block mb-6">
                                Access to Standard Apps
                            </div>
                            <Link to="/register" className="btn btn-secondary w-full">Start Free Trial</Link>
                        </div>

                        {/* Business (Popular) */}
                        <div className="bg-white rounded-3xl p-8 border-2 border-primary shadow-xl scale-105 relative z-10">
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">MOST POPULAR</div>
                            <h3 className="text-2xl font-bold text-primary">Chain</h3>
                            <p className="text-gray-500 text-sm mt-1">For hotel groups</p>
                            <div className="my-6">
                                <span className="text-4xl font-bold text-gray-900">₹15,000</span>
                                <span className="text-gray-500">/mo</span>
                            </div>
                            <div className="bg-yellow-50 text-yellow-800 text-xs font-semibold px-3 py-1 rounded inline-block mb-6">
                                Priority Support & API
                            </div>
                            <Link to="/register" className="btn btn-primary w-full bg-gradient-to-r from-purple-600 to-pink-600 border-none">
                                Choose Chain Plan
                            </Link>
                            <p className="text-xs text-center text-gray-400 mt-4">Multi-property management</p>
                        </div>

                        {/* Enterprise */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
                            <p className="text-gray-500 text-sm mt-1">Global brands</p>
                            <div className="my-6">
                                <span className="text-4xl font-bold text-gray-900">Custom</span>
                            </div>
                            <div className="bg-yellow-50 text-yellow-800 text-xs font-semibold px-3 py-1 rounded inline-block mb-6">
                                Dedicated Success Manager
                            </div>
                            <Link to="/consulting" className="btn btn-secondary w-full bg-gray-900 text-white hover:bg-black border-none">
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CTA SECTION */}
            <section className="py-24 bg-white">
                <div className="main-container">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400 opacity-20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6 border border-white/10">
                                Get Started Today
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to transform your hotel?
                            </h2>
                            <p className="text-blue-100 text-lg mb-10">
                                Join Hotel Tech Market and start making smarter technology decisions today.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 btn-lg shadow-xl border-none">
                                    Join Now
                                </Link>
                                <Link to="/products" className="btn bg-transparent border border-white/30 text-white hover:bg-white/10 btn-lg">
                                    Browse Marketplace
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Overlay */}
            <AIMatchmaker />
        </div>
    );
};

export default Home;

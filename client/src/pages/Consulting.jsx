import { useState } from 'react';
import { CheckCircle, ArrowRight, Users, BarChart, Code, Building } from 'lucide-react';

const Consulting = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your interest! A consultant will contact you shortly.');
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    const services = [
        {
            icon: <Users className="w-8 h-8 text-white" />,
            title: "Digital Transformation Strategy",
            description: "We help you build a roadmap for digital adoption, ensuring your technology stack aligns with your business goals."
        },
        {
            icon: <Code className="w-8 h-8 text-white" />,
            title: "Custom Integration Services",
            description: "Connect your PMS, POS, and other systems seamlessly. We specialize in API integrations and custom middleware solutions."
        },
        {
            icon: <BarChart className="w-8 h-8 text-white" />,
            title: "Revenue Optimization",
            description: "Audit your current revenue management practices and implement tools to maximize ADR and RevPAR."
        },
        {
            icon: <Building className="w-8 h-8 text-white" />,
            title: "PMS Implementation Support",
            description: "Expert guidance during your Property Management System migration to ensure zero downtime and staff readiness."
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Expert Guidance for Your Hospitality Tech Stack
                        </h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Navigating the hotel technology landscape is complex. Our consultants act as your trusted advisors to select, implement, and optimize the right solutions.
                        </p>
                        <a href="#contact" className="inline-block bg-secondary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                            Schedule a Free Consultation
                        </a>
                    </div>
                </div>
                {/* Abstract shapes/bg */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-800 rounded-full opacity-20 filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600 rounded-full opacity-20 filter blur-3xl"></div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Consulting Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From selecting the right software to complex custom integrations, we bridge the gap between hospitality operations and technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                            alt="Consulting Meeting"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why HotelTechMarket Consulting?</h2>
                        <ul className="space-y-4">
                            {[
                                "Vendor Agnostic: We recommend what's best for YOU, not commissions.",
                                "Deep Industry Expertise: Our team comprises former hoteliers and tech CTOs.",
                                "Data-Driven Approach: Decisions backed by real market data and performance metrics.",
                                "End-to-End Support: From RFP management to go-live training."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />
                                    <span className="text-lg text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
                        <div className="bg-primary text-white p-10 md:w-2/5 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold mb-4">Let's talk about your project</h3>
                            <p className="text-blue-100 mb-8">
                                Fill out the form and our team will get back to you within 24 hours.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                        <ArrowRight size={16} />
                                    </div>
                                    <span>Free initial assessment</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                                        <ArrowRight size={16} />
                                    </div>
                                    <span>Custom ROI calculation</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 md:w-3/5">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company / Hotel Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
                                    <textarea
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Consulting;

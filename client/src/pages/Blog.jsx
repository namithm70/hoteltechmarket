import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader2, Calendar, User, Tag, ArrowRight } from 'lucide-react';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blogs');
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Blog Hero */}
            <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Insights & News
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Latest trends, expert opinions, and updates from the world of hospitality technology.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full border border-gray-100">
                            <div className="h-56 overflow-hidden relative group">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {blog.tags.map(tag => (
                                        <span key={tag} className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-primary uppercase tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User size={14} />
                                        {blog.author}
                                    </div>
                                </div>

                                <Link to={`/blog/${blog.slug}`}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-primary transition-colors cursor-pointer">
                                        {blog.title}
                                    </h3>
                                </Link>

                                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                                    {blog.content}
                                </p>

                                <Link to={`/blog/${blog.slug}`} className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                                    Read Article <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {blogs.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No blog posts found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;

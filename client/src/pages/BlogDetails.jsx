import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';

const BlogDetails = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`/api/blogs/${slug}`);
                setPost(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch blog post');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <Link to="/blog" className="text-primary hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Image */}
            <div className="h-96 w-full relative">
                <img
                    src={post.image || 'https://via.placeholder.com/1200x600'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center text-white">
                        <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                            {post.category || 'Technology'}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-200">
                            <span className="flex items-center gap-2">
                                <User size={16} /> {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to Articles
                    </Link>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        {/* 
                           Note: For a real app, use a markdown parser or sanitized HTML. 
                           For now, we'll split by newlines for basic formatting 
                        */}
                        {post.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags && post.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;

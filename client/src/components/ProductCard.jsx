import { Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full relative group">
            {product.isFeatured && (
                <div className="absolute top-0 left-0 bg-accent text-primary text-[10px] font-bold px-3 py-1 uppercase tracking-wider z-10 shadow-sm">
                    Featured
                </div>
            )}

            <div className="p-6 flex flex-col items-center border-b border-gray-100 bg-white">
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <img
                        src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/100'}
                        alt={product.title}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                    {product.title}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            className={i < (4) ? "fill-accent text-accent" : "text-gray-300"}
                        />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({10})</span>
                </div>
            </div>

            <div className="p-4 flex-grow bg-gray-50/50">
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 text-center">
                    {product.description}
                </p>
                <div className="text-center font-bold text-primary mt-2">${product.price}</div>
            </div>

            <div className="flex border-t border-gray-100">
                <Link to={`/product/${product._id}`} className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-100 flex items-center justify-center gap-2 transition-colors">
                    <Eye size={16} /> View Details
                </Link>
                <Link to={`/product/${product._id}`} className="flex-1 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    Buy Now
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;

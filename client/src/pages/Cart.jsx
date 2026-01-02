import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { user } = useSelector((state) => state.auth);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = async () => {
        if (!user) {
            navigate('/login?redirect=cart');
        } else {
            // Create Order Logic
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const orderData = {
                    orderItems: cartItems.map((item) => ({
                        product: item._id,
                        title: item.title,
                        image: item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150',
                        price: item.price,
                        qty: item.qty,
                        vendor: item.vendor // Ensure product has vendor populated or ID
                    })),
                    paymentMethod: 'Credit Card',
                    itemsPrice: subtotal,
                    taxPrice: subtotal * 0.08,
                    shippingPrice: 0,
                    totalPrice: subtotal * 1.08,
                };

                const { data } = await axios.post('/api/orders', orderData, config);
                alert('Order Placed Successfully!');
                // Clear cart (should dispatch clearCart action here locally too ideally, but for now redirect)
                navigate(`/dashboard`); // Redirect to User Dashboard
            } catch (error) {
                console.error(error);
                alert('Error placing order');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <ShoppingCart /> Your Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
                    <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors inline-block">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="flex-grow space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                                        <img src={item.image || (item.images && item.images[0])} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <Link to={`/product/${item._id}`} className="font-semibold text-gray-900 hover:text-primary">
                                            {item.title}
                                        </Link>
                                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        <p className="font-medium text-gray-900 mt-1">${item.price}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCartHandler(item._id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Taxes (est.)</span>
                                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span>${(subtotal * 1.08).toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                onClick={checkoutHandler}
                                className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                Checkout <ArrowRight size={18} />
                            </button>
                            <div className="mt-4 flex justify-center gap-2">
                                <span className="text-xs text-gray-400">Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import VendorLayout from './layouts/VendorLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';

// Placeholder Components - Replace these later
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Products from './pages/Products';
import Consulting from './pages/Consulting';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Cart from './pages/Cart';

// Placeholder Components - Replace these later
import Home from './pages/Home';
import VendorLogin from './pages/VendorLogin';
import VendorRegister from './pages/VendorRegister';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorProducts from './pages/vendor/VendorProducts';
import AddProduct from './pages/vendor/AddProduct';
import VendorOrders from './pages/vendor/VendorOrders';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="consulting" element={<Consulting />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetails />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="dashboard" element={<UserDashboard />} />

            {/* Vendor Login is technically public but leads to protected area */}
            <Route path="vendor/login" element={<VendorLogin />} />
            <Route path="vendor/register" element={<VendorRegister />} />
          </Route>

          {/* Protected Vendor Routes */}
          <Route path="/vendor" element={<VendorLayout />}>
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="orders" element={<VendorOrders />} />
            <Route path="settings" element={<h1 className="p-8">Settings Coming Soon</h1>} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

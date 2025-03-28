// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ProductList from "./pages/admin/ProductList";
import NewProduct from "./pages/admin/NewProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminDashboard from "./pages/admin/AdminDashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./pages/Cart";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/productlist" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>}/>
        <Route path="/admin/new" element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Router>
    </CartProvider>
  );
}

export default App;

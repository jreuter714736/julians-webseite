import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../pages/Cart"; // ✅ nicht "../pages/Cart"

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { cart } = useCart(); // ✅ Hier Warenkorb

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(payload.is_admin === true); // ✅ korrekte Rolle
      } catch (err) {
        console.error("Fehler beim Token-Parsing:", err);
        setIsAdmin(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/shop" className="hover:underline">
          Shop
        </Link>
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Registrieren
            </Link>
          </>
        )}

        {isAdmin && (
          <>
            <Link to="/admin/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/admin/productlist" className="hover:underline">
              Produkte verwalten
            </Link>
            <Link to="/admin/orders" className="hover:underline">
              Bestellungen
            </Link>
          </>
        )}
      </div>

      <div className="space-x-4">
        {isLoggedIn && (
          <>
            <Link to="/checkout" className="hover:underline">
              🛒 Warenkorb ({cart.length})
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

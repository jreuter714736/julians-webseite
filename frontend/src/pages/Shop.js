import React from "react";
import { useNavigate } from "react-router-dom";

const DUMMY_PRODUCTS = [
  { id: 1, name: "Produkt A", price: 19.99 },
  { id: 2, name: "Produkt B", price: 29.99 },
  { id: 3, name: "Produkt C", price: 39.99 },
];

const Shop = () => {
  const navigate = useNavigate();

  const handleBuy = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/checkout" } });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛍 Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {DUMMY_PRODUCTS.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="mb-2">💰 {product.price.toFixed(2)} €</p>
            <button
              onClick={handleBuy}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Jetzt kaufen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;

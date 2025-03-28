import { useEffect, useState } from "react";
import { useCart } from "../pages/Cart";
import { toast } from "react-toastify";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Fehler beim Laden der Produkte:", err);
        toast.error("Produkte konnten nicht geladen werden");
      });
  }, []);

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.name} wurde zum Warenkorb hinzugefügt`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                €{Number(product.price).toFixed(2)}
              </p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="mt-4 h-32 w-auto object-contain"
                />
              )}
            </div>
            <button
              onClick={() => handleAdd(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              In den Warenkorb
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;

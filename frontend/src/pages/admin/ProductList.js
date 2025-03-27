import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  // Produkte vom Backend holen
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fehler beim Laden:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Produkt löschen
  const handleDelete = async (id) => {
    if (!window.confirm("Wirklich löschen?")) return;
    try {
      await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      alert("Löschen fehlgeschlagen");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Produktverwaltung</h2>

      {/* ➕ Neues Produkt */}
      <div className="mb-4">
        <Link
          to="/admin/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Neues Produkt hinzufügen
        </Link>
      </div>

      {/* Produktliste */}
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-600">€{Number(p.price).toFixed(2)}</p>
              {p.image && (
                <img src={p.image} alt={p.name} className="w-16 h-16 mt-2 rounded" />
              )}
            </div>
            <div className="flex gap-4">
              <Link
                to={`/admin/edit/${p.id}`}
                className="text-blue-500 hover:underline"
              >
                Bearbeiten
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-500 hover:underline"
              >
                Löschen
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

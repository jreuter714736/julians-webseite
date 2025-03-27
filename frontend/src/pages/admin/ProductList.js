import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Token holen
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Fehler beim Laden der Produkte:", error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Produkt wirklich löschen?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert("Produkt gelöscht");
      } else {
        alert("Löschen fehlgeschlagen");
      }
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produktverwaltung</h1>
      <button
        onClick={() => navigate("/admin/new")}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        + Neues Produkt
      </button>

      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Preis</th>
            <th className="border p-2">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td className="border p-2">{prod.id}</td>
              <td className="border p-2">{prod.name}</td>
              <td className="border p-2">{prod.price} €</td>
              <td className="border p-2">
                <button
                  className="mr-2 px-3 py-1 bg-yellow-400 text-white rounded"
                  onClick={() => navigate(`/admin/edit/${prod.id}`)}
                >
                  Bearbeiten
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(prod.id)}
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

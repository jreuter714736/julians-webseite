import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ name: "", price: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:4000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Produkt aktualisiert!");
      navigate("/admin");
    } else {
      alert("Fehler beim Aktualisieren");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produkt bearbeiten</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          step="0.01"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
          Speichern
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

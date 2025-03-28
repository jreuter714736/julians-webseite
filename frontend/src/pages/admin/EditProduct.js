import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("Fehler beim Laden:", err);
        toast.error("Produkt konnte nicht geladen werden");
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert("Produkt aktualisiert");
        navigate("/admin/productlist"); // ✅ zurück zur Liste
      } else {
        const data = await res.json();
        toast.error("Fehler beim Aktualisieren");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server fehler");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Produkt bearbeiten</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="image_url"
          value={product.image_url}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Speichern
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

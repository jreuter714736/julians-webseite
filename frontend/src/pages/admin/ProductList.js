import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  const token = localStorage.getItem("token");

  // Produkte vom Backend holen
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:4000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Neues Produkt hinzufügen
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setForm({ name: "", price: "", image: "" });
      fetchProducts(); // Neu laden
    } catch (err) {
      alert("Fehler beim Hinzufügen");
      console.error(err);
    }
  };

  // Produkt löschen
  const handleDelete = async (id) => {
    if (!window.confirm("Wirklich löschen?")) return;
    await fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Produktverwaltung</h2>

      {/* Formular */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Preis"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          className="border p-2 mr-2"
          placeholder="Bild-URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button className="bg-blue-500 text-white p-2 rounded">Hinzufügen</button>
      </form>

      {/* Produktliste */}
      <ul>
        {products.map((p) => (
          <li key={p.id} className="mb-4 flex items-center justify-between border-b pb-2">
            <div>
              <strong>{p.name}</strong> – €{p.price}
              {p.image && <img src={p.image} alt="" className="w-16 h-16 inline ml-2" />}
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-500 hover:underline"
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

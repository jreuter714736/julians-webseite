import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, price, image_url }),
      });

      if (res.ok) {
        alert("Produkt erfolgreich erstellt");
        navigate("/admin/productlist"); // ✅ zurück zur Produktliste
      } else {
        const data = await res.json();
        alert(data.error || "Fehler beim Erstellen");
      }
    } catch (err) {
      console.error(err);
      alert("Serverfehler");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Neues Produkt anlegen</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />
        <textarea
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="number"
          placeholder="Preis"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          placeholder="Bild-URL"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Erstellen
        </button>
      </form>
    </div>
  );
};

export default NewProduct;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0); // ✔️ später aktivieren

  useEffect(() => {
    // Produkte zählen
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProductCount(data.length))
      .catch((err) => console.error("Fehler beim Laden der Produkte:", err));

    // Optional: Später Bestellungen aktivieren
    /*
    fetch("http://localhost:4000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrderCount(data.length))
      .catch((err) => console.error("Fehler beim Laden der Bestellungen:", err));
    */
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* 🔢 Statistik */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500 text-sm">Produkte insgesamt</p>
          <p className="text-2xl font-semibold">{productCount}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500 text-sm">Bestellungen</p>
          <p className="text-2xl font-semibold">{orderCount}</p>
          <p className="text-xs text-gray-400">(später aktivieren)</p>
        </div>
      </div>

      {/* 📦 Kartenmenü */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/productlist"
          className="p-6 bg-blue-100 hover:bg-blue-200 rounded shadow"
        >
          <h2 className="text-xl font-semibold">🛍️ Produktverwaltung</h2>
          <p className="mt-2 text-gray-700">
            Produkte hinzufügen, bearbeiten oder löschen
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="p-6 bg-green-100 hover:bg-green-200 rounded shadow"
        >
          <h2 className="text-xl font-semibold">📦 Bestellungen verwalten</h2>
          <p className="mt-2 text-gray-700">
            Übersicht und Bearbeitung von Bestellungen
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

// src/pages/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/products"
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
            Überblick über eingegangene Bestellungen
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

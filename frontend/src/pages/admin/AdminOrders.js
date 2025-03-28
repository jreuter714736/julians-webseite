import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Fehler beim Laden:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:4000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Status aktualisiert");
        fetchOrders(); // neu laden
      } else {
        toast.error(data.error || "Fehler beim Aktualisieren");
      }
    } catch (err) {
      console.error("Statusfehler:", err);
      toast.error("Serverfehler");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📦 Bestellungen</h1>
      {orders.length === 0 ? (
        <p>Keine Bestellungen vorhanden.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border p-4 rounded bg-white shadow"
            >
              <p className="font-semibold mb-1">
                Bestell-ID: {order.id} | {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Kunde: {order.user_email}
              </p>

              <ul className="ml-4 list-disc mb-2">
                {JSON.parse(order.items).map((item) => (
                  <li key={item.id}>
                    {item.name} – {item.quantity} × €{Number(item.price).toFixed(2)}
                  </li>
                ))}
              </ul>

              <p className="mb-2 font-semibold">
                Gesamt: €{Number(order.total).toFixed(2)}
              </p>

              <label className="text-sm font-medium mr-2">Status:</label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="Offen">Offen</option>
                <option value="Versendet">Versendet</option>
                <option value="Storniert">Storniert</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrders;

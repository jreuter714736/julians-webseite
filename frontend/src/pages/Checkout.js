import React from "react";
import { useCart } from "../pages/Cart";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (cart.length === 0) {
      toast.warn("Dein Warenkorb ist leer!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Bestellung erfolgreich!");
        clearCart();
      } else {
        toast.error(data.error || "Fehler beim Abschicken");
      }
    } catch (err) {
      console.error("Bestellfehler:", err);
      toast.error("Serverfehler beim Abschicken");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Dein Warenkorb</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Der Warenkorb ist leer.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × €{Number(item.price).toFixed(2)}
                  </p>
                  <p className="text-sm mt-1 text-gray-600">
                    Gesamt: €{(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Entfernen
                </button>
              </li>
            ))}
          </ul>

          {/* Gesamt & Buttons */}
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <p className="text-xl font-semibold">
              Gesamtbetrag: €{total.toFixed(2)}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleOrder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Bestellung abschicken
              </button>
              <button
                onClick={clearCart}
                className="text-red-500 hover:underline"
              >
                Warenkorb leeren
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;

const express = require("express");
const router = express.Router();
const knex = require("../knex");
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware");




// Bestellung speichern
router.post("/", authenticateToken, async (req, res) => {
  const { items, total } = req.body;
  const user_email = req.user.email;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Keine Artikel in der Bestellung" });
  }

  try {
    await knex("orders").insert({
      user_email,
      items: JSON.stringify(items),
      total,
    });

    res.status(201).json({ message: "Bestellung erfolgreich gespeichert" });
  } catch (err) {
    console.error("Fehler beim Speichern der Bestellung:", err);
    res.status(500).json({ error: "Fehler beim Speichern der Bestellung" });
  }
});


// Alle Bestellungen abrufen (nur für Admin)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orders = await knex("orders").orderBy("created_at", "desc");
    res.json(orders);
  } catch (err) {
    console.error("Fehler beim Abrufen der Bestellungen:", err);
    res.status(500).json({ error: "Fehler beim Abrufen der Bestellungen" });
  }
});



// ✅ Bestellstatus aktualisieren (nur für Admins)
router.put("/:id/status", authenticateToken, async (req, res) => {
  const isAdmin = req.user.isAdmin;
  const { id } = req.params;
  const { status } = req.body;

  if (!isAdmin) {
    return res.status(403).json({ error: "Nur Admins dürfen den Status ändern" });
  }

  if (!status || !["Offen", "Versendet", "Storniert"].includes(status)) {
    return res.status(400).json({ error: "Ungültiger Statuswert" });
  }

  try {
    await knex("orders").where({ id }).update({ status });
    res.json({ message: "Status erfolgreich aktualisiert" });
  } catch (err) {
    console.error("Fehler beim Aktualisieren des Status:", err);
    res.status(500).json({ error: "Fehler beim Ändern des Bestellstatus" });
  }
});

module.exports = router;

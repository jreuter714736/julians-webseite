const express = require("express");
const router = express.Router();
const knex = require("../knex");
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware");


// 🟢 GET /api/products – öffentlich
router.get("/", async (req, res) => {
  try {
    const products = await knex("products").select("*");
    res.json(products);
  } catch (err) {
    console.error("Fehler beim Laden der Produkte:", err);
    res.status(500).json({ error: "Fehler beim Laden der Produkte" });
  }
});

// 🟡 POST /api/products – nur für Admins
router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  const { name, description, price, image_url } = req.body;

  try {
    const [newProduct] = await knex("products")
      .insert({ name, description, price, image_url })
      .returning("*");

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Fehler beim Erstellen des Produkts:", err);
    res.status(500).json({ error: "Produkt konnte nicht erstellt werden" });
  }
});

// 🟠 PUT /api/products/:id – nur für Admins
router.put("/:id", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url } = req.body;

  try {
    const [updatedProduct] = await knex("products")
      .where({ id })
      .update({ name, description, price, image_url })
      .returning("*");

    res.json(updatedProduct);
  } catch (err) {
    console.error("Fehler beim Aktualisieren des Produkts:", err);
    res.status(500).json({ error: "Produkt konnte nicht aktualisiert werden" });
  }
});

// 🔴 DELETE /api/products/:id – nur für Admins
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await knex("products").where({ id }).del();
    res.status(204).send();
  } catch (err) {
    console.error("Fehler beim Löschen des Produkts:", err);
    res.status(500).json({ error: "Produkt konnte nicht gelöscht werden" });
  }
});

module.exports = router;

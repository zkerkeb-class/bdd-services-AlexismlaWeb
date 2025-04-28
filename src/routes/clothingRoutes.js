const express = require("express");
const router = express.Router();

const {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔥 Ici, on protège uniquement les routes sensibles

// GET et DELETE sont protégés
router.get("/", authMiddleware, getClothingItems);
router.delete("/:id", authMiddleware, deleteClothingItem);

// POST (création vêtement) reste libre TEMPORAIREMENT
router.post("/", addClothingItem);

module.exports = router;

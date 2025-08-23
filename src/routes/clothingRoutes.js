const express = require("express");
const router = express.Router();

const {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  updateClothingItem,
} = require("../controllers/clothingController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔥 Ici, on protège uniquement les routes sensibles

// GET et DELETE sont protégés
router.get("/", authMiddleware, getClothingItems);
router.delete("/:id", authMiddleware, deleteClothingItem);
router.put('/:id', authMiddleware, updateClothingItem);


// POST (création vêtement) reste libre TEMPORAIREMENT
router.post("/", addClothingItem);

module.exports = router;

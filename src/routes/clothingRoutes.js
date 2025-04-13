const express = require("express");
const router = express.Router();

const {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingController");

const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); // toutes les routes sont protégées

router.get("/", getClothingItems);
router.post("/", addClothingItem);
router.delete("/:id", deleteClothingItem);

module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getOutfits,
  createOutfit,
  deleteOutfit,
} = require("../controllers/outfitController");

router.use(authMiddleware);

router.get("/", getOutfits);
router.post("/", createOutfit);
router.delete("/:id", deleteOutfit);

module.exports = router;

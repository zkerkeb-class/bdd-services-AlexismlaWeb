const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getPreferences,
  upsertPreferences,
} = require("../controllers/preferenceController");

router.use(authMiddleware);

router.get("/", getPreferences);
router.post("/", upsertPreferences);

module.exports = router;

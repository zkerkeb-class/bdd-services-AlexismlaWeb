const express = require("express");
const {
  createUser,
  getUserByEmail,
  getUserById,
  deleteUserById,
  consumeToken,
  resetTokens,
  getUserByResetToken,
  updateResetTokens,
  updateUserById,
  updateResetPassword
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id/consume-token", consumeToken);
router.put("/:id/reset-tokens", resetTokens);
router.get("/by-reset-token/:token", getUserByResetToken);
router.put("/:id/reset-tokens", updateResetTokens);
router.put("/:id", updateUserById);
router.put("/:id/reset-password", updateResetPassword);

module.exports = router;

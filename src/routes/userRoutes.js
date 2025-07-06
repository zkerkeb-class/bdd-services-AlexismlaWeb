const express = require("express");
const {
  createUser,
  getUserByEmail,
  getUserById,
  deleteUserById,
  consumeToken,
  resetTokens,  
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id/consume-token", consumeToken);
router.put("/:id/reset-tokens", resetTokens);


module.exports = router;

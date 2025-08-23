const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🧐 [Middleware Auth] Headers reçus :", req.headers);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("⛔️ [Middleware Auth] Authorization Header manquant ou mal formé !");
    return res.status(401).json({ error: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("🔑 [Middleware Auth] Token reçu :", token);
    console.log("🔒 [Middleware Auth] JWT_SECRET utilisé :", process.env.JWT_SECRET);

    if (!process.env.JWT_SECRET) {
      console.error("❌ [Middleware Auth] JWT_SECRET est undefined !");
      return res.status(500).json({ error: "Erreur de configuration du serveur." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ [Middleware Auth] Décodage réussi :", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("⛔️ [Middleware Auth] Erreur lors de la vérification du token :", error.message);
    return res.status(401).json({ error: "Token invalide" });
  }
};

module.exports = authMiddleware;

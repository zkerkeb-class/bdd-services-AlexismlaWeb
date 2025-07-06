const prisma = require("../prisma/client");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Utilisateur existe déjà." });
    }

    const user = await prisma.user.create({
      data: { email, password },
    });

    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    console.error("Erreur createUser:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

    // Supprime le champ password de la réponse
    const { password, ...safeUser } = user;
    res.status(200).json(safeUser);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};



const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé." });

    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const consumeToken = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    if (user.aiTokens <= 0) {
      return res.status(400).json({ error: "Aucun token IA disponible" });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { aiTokens: { decrement: 1 } },
    });

    res.status(200).json({ message: "Token consommé", aiTokens: updated.aiTokens });
  } catch (err) {
    console.error("Erreur consumeToken:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const resetTokens = async (req, res) => {
  const { id } = req.params;
  const { aiTokens, lastTokenReset } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        aiTokens: { increment: aiTokens },
        lastTokenReset: new Date(lastTokenReset || new Date()),
      },
    });

    res.status(200).json({ message: "Tokens réinitialisés", user: updated });
  } catch (err) {
    console.error("Erreur resetTokens:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  deleteUserById,
  consumeToken,
  resetTokens,
};

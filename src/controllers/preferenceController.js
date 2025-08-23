const prisma = require("../prisma/client");

// GET préférences de l'utilisateur connecté
const getPreferences = async (req, res) => {
  try {
    const preference = await prisma.preference.findUnique({
      where: { userId: req.user.id },
    });

    if (!preference) {
      return res.status(404).json({ message: "Aucune préférence trouvée" });
    }

    res.status(200).json(preference);
  } catch (error) {
    console.error("Erreur getPreferences:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST créer ou mettre à jour les préférences
const upsertPreferences = async (req, res) => {
  const {
    favoriteColors = [],
    avoidColors = [],
    favoriteStyles = [],
    avoidTypes = [],
  } = req.body;

  try {
    const updated = await prisma.preference.upsert({
      where: { userId: req.user.id },
      update: {
        favoriteColors,
        avoidColors,
        favoriteStyles,
        avoidTypes,
      },
      create: {
        userId: req.user.id,
        favoriteColors,
        avoidColors,
        favoriteStyles,
        avoidTypes,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Erreur upsertPreferences:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getPreferences,
  upsertPreferences,
};

const prisma = require("../prisma/client");

// GET toutes les tenues d'un utilisateur
const getOutfits = async (req, res) => {
  try {
    const outfits = await prisma.outfit.findMany({
      where: { userId: req.user.id },
    });
    res.status(200).json(outfits);
  } catch (error) {
    console.error("Erreur getOutfits:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST créer une nouvelle tenue
const createOutfit = async (req, res) => {
  const { clothingIds, name } = req.body;

  if (!clothingIds || !Array.isArray(clothingIds)) {
    return res.status(400).json({ error: "clothingIds doit être un tableau" });
  }

  try {
    const outfit = await prisma.outfit.create({
      data: {
        userId: req.user.id,
        clothingIds,
        name,
      },
    });
    res.status(201).json(outfit);
  } catch (error) {
    console.error("Erreur createOutfit:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// DELETE une tenue par ID
const deleteOutfit = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.outfit.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Erreur deleteOutfit:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getOutfits,
  createOutfit,
  deleteOutfit,
};

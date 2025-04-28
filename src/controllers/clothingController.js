const prisma = require("../prisma/client");

const getClothingItems = async (req, res) => {
  try {
    const userId = req.query.userId; // ✅ maintenant depuis la query string
    if (!userId) {
      return res.status(400).json({ error: "userId est requis en query." });
    }

    const items = await prisma.clothingItem.findMany({
      where: { userId },
    });

    res.status(200).json(items);
  } catch (error) {
    console.error("Erreur getClothingItems:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const addClothingItem = async (req, res) => {
  const {
    type,
    brand,
    color,
    secondaryColor,
    style,
    imageUrl,
    season,
  } = req.body;

  try {
    // 🚨 Vérifier s'il existe déjà un vêtement similaire

    // 1️⃣ Vérification par imageUrl
    const existingByImage = await prisma.clothingItem.findFirst({
      where: {
        userId: req.user.id,
        imageUrl: imageUrl,
      },
    });

    // 2️⃣ Vérification par propriétés (type, color, brand)
    const existingByProperties = await prisma.clothingItem.findFirst({
      where: {
        userId: req.user.id,
        type: type,
        color: color,
        brand: brand,
      },
    });

    if (existingByImage || existingByProperties) {
      return res.status(200).json({
        message: "Vêtement déjà présent dans la garde-robe",
        duplicate: true,
        existingItem: existingByImage || existingByProperties,
      });
    }

    // ✅ Si aucun doublon, créer le vêtement
    const newItem = await prisma.clothingItem.create({
      data: {
        userId: req.user.id,
        type,
        brand,
        color,
        secondaryColor,
        style,
        imageUrl,
        season,
      },
    });

    res.status(201).json({
      message: "Vêtement ajouté avec succès",
      duplicate: false,
      clothingItem: newItem,
    });

  } catch (error) {
    console.error("Erreur addClothingItem:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};



const deleteClothingItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.clothingItem.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Erreur deleteClothingItem:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
};

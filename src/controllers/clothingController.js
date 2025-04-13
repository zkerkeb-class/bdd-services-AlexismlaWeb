const prisma = require("../prisma/client");

const getClothingItems = async (req, res) => {
  try {
    const items = await prisma.clothingItem.findMany({
      where: { userId: req.user.id },
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

    res.status(201).json(newItem);
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

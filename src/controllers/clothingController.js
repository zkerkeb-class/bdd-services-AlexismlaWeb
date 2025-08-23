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
    userId,  // <- on récupère depuis le body
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
        userId: userId,  // <- on utilise celui du body
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

const updateClothingItem = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedItem = await prisma.clothingItem.update({
      where: { id },
      data,
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Erreur updateClothingItem:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


module.exports = {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  updateClothingItem,
};

const prisma = require("../prisma/client");

const getClothingItems = async (req, res) => {
  try {
    const userId = req.query.userId; // ✅ maintenant depuis la query string
    if (!userId) {
      return res.status(400).json({ error: "userId est requis en query." });
    }

    const items = await prisma.clothingItem.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        type: true,
        brand: true,
        suggestedBrands: true,
        color: true,
        secondaryColor: true,
        style: true,
        imageUrl: true,
        season: true,
        createdAt: true,
      },
    });

    res.status(200).json(items);
  } catch (error) {
    console.error("Erreur getClothingItems:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getClothingItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const item = await prisma.clothingItem.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        type: true,
        brand: true,
        suggestedBrands: true,
        color: true,
        secondaryColor: true,
        style: true,
        imageUrl: true,
        season: true,
        createdAt: true,
      },
    });

    if (!item) {
      return res.status(404).json({ error: "Vêtement non trouvé" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Erreur getClothingItem:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const addClothingItem = async (req, res) => {
  const {
    userId,  // <- on récupère depuis le body
    type,
    brand,
    suggestedBrands,
    color,
    secondaryColor,
    style,
    imageUrl,
    season,
  } = req.body;

  // Convertir suggestedBrands en tableau si c'est une chaîne
  let suggestedBrandsArray = suggestedBrands;
  if (typeof suggestedBrands === 'string') {
    suggestedBrandsArray = suggestedBrands.split(',').map(brand => brand.trim());
  } else if (!Array.isArray(suggestedBrands)) {
    suggestedBrandsArray = [];
  }

  try {
    const newItem = await prisma.clothingItem.create({
      data: {
        userId: userId,  // <- on utilise celui du body
        type,
        brand,
        suggestedBrands: suggestedBrandsArray,
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
  getClothingItem,
  addClothingItem,
  deleteClothingItem,
  updateClothingItem,
};

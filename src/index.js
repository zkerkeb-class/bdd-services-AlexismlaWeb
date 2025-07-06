require("dotenv").config();
const express = require("express");
const clothingRoutes = require("./routes/clothingRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");
const outfitRoutes = require("./routes/outfitRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/api/clothing", clothingRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/users", userRoutes);



const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`🚀 BDD service running on port ${PORT}`);
});

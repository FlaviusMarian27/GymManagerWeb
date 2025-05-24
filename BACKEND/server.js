// BACKEND/server.js

const express  = require("express");
const mongoose = require("mongoose");
const dotenv   = require("dotenv");
const cors     = require("cors");
const path     = require("path");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 1) Rutele API pentru autentificare și antrenori
app.use("/api/auth", require("./routes/authRoutes"));

// 2) Servește tot conținutul din folderul rădăcină (ProjectGym)
app.use(express.static(path.join(__dirname, "..")));

// 3) Fallback pentru orice cerere nepreluată de mai sus
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "login.html"));
});

// 4) Conectare la MongoDB + pornire server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectat la MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server pe http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ Eroare MongoDB:", err));

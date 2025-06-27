require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const alunoRoutes = require("./routes/alunoRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", alunoRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Conectado ao MongoDB");
  app.listen(5000, () => console.log("API na porta 5000"));
});

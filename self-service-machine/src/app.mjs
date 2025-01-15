import express from "express";

const app = express();
const port = 3000;

//Route pour /
app.get("/", (req, res) => {
  res.send("API REST of self service machine !");
});

//Route pour /api/
app.get("/api/", (req, res) => {
  res.redirect(`http://localhost:${port}/`);
});

import { productsRouter } from "./routes/products.mjs";
//Les routes qui commencent par /api/products sont dans products.mjs
app.use("/api/products", productsRouter); //On utilise les routes de products.mjs. La racine des routes de products.mjs sera /api/products

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

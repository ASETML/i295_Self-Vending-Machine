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
app.use("/api/products", productsRouter); //On utilise la route qu'on a créée

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

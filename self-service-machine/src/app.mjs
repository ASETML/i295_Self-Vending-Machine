import express from "express";
import swaggerUi from "swagger-ui-express";

const app = express();

//On utilise un middleware
app.use(express.json()); //Transforme les requêtes en objets js

const port = 3000;

import { swaggerSpec } from "./swagger.mjs";

//Route pour accéder à la documentation Swagger
//const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

//Connection à la DB
import { sequelize, initDb } from "./db/sequelize.mjs";
sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établie")
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));
initDb(); //Ajout des données

//Route pour la racine
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

import { loginRouter } from "./routes/login.mjs";
app.use("/api/login", loginRouter);

//Middleware
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import express from "express";
import { products } from "../db/mock-product.mjs";
import { success, getUniqueId } from "./helper.mjs";

const productsRouter = express();

//On crée une route
productsRouter.get("/", (req, res) => {
  const message = "La liste des produits a bien été récupérée";
  res.json(success(message, products));
});

//Récupération d'un produit
productsRouter.get("/:id", (req, res) => {
  const productId = req.params.id; //On récupère l'id du produit dans les paramètres de la requête
  const product = products.find((product) => product.id == productId); //On récupère le produit qui à l'Id de la requête
  const message = `Le produit dont l'id est ${productId} a bien été récupéré`;
  res.json(success(message, product));
});

productsRouter.post("/", (req, res) => {
  // Création d'un nouvel id du produit
  // Dans les prochains versions, c'est MySQL qui gérera cela pour nous (identifiant auto_increment)
  const id = getUniqueId(products);

  // Création d'un objet avec les nouvelles informations du produits
  const createdProduct = { ...req.body, id: id, created: new Date() };

  // Ajout du nouveau produit dans le tableau
  products.push(createdProduct);

  const message = `Le produit ${createdProduct.name} a bien été créé !`;

  res.json(success(message, createdProduct));
});

export { productsRouter };

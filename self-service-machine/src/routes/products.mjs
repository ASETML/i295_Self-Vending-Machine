import express from "express";
import { products } from "../db/mock-product.mjs";
import { success } from "./helper.mjs";

const productsRouter = express();

//On crée une route
productsRouter.get("/", (req, res) => {
  const message = "La liste des produits a bien été récupérée";
  res.json(success(message, products));
});

export { productsRouter };

import express from "express";
import { Product } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";

const productsRouter = express();

//On crée une route
productsRouter.get("/", (req, res) => {
  Product.findAll().then((products) => {
    const message = "La liste des produits a bien été récupérée.";
    res.json(success(message, products));
  });
});

//Récupération d'un produit
productsRouter.get("/:id", (req, res) => {
  //Recherche par id
  Product.findByPk(req.params.id).then((product) => {
    const message = `Le produit dont l'id vaut ${product.id} a bien été récupéré.`;
    res.json(success(message, product));
  });
});

//Création d'un produit
productsRouter.post("/", (req, res) => {
  //Crée un produit
  Product.create(req.body).then((createdProduct) => {
    // Définir un message pour le consommateur de l'API REST
    const message = `Le produit ${createdProduct.name} a bien été créé !`;
    // Retourner la réponse HTTP en json avec le msg et le produit créé
    res.json(success(message, createdProduct));
  });
});

//Suppression d'un produit
productsRouter.delete("/:id", (req, res) => {
  //Promesses chainées
  //Recherche par id
  Product.findByPk(req.params.id).then((deletedProduct) => {
    //Suppression du produit
    Product.destroy({
      where: { id: deletedProduct.id },
    }).then((_) => {
      // Définir un message pour le consommateur de l'API REST
      const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
      // Retourner la réponse HTTP en json avec le msg et le produit créé
      res.json(success(message, deletedProduct));
    });
  });
});

//Modification d'un produit
productsRouter.put("/:id", (req, res) => {
  const productId = req.params.id;
  //Mises a jour d'un produit
  Product.update(req.body, { where: { id: productId } }).then((_) => {
    Product.findByPk(productId).then((updatedProduct) => {
      // Définir un message pour l'utilisateur de l'API REST
      const message = `Le produit ${updatedProduct.name} dont l'id vaut ${updatedProduct.id} a été mis à jour avec succès`;
      // Retourner la réponse HTTP en json avec le msg et le produit créé
      res.json(success(message, updatedProduct));
    });
  });
});

export { productsRouter };

import express from "express";
import { Product } from "../db/sequelize.mjs";
import { success } from "./helper.mjs";

const productsRouter = express();

//On crée une route
productsRouter.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      const message = "La liste des produits a bien été récupérée.";
      res.json(success(message, products));
    })
    //Si erreur dans la promesse
    .catch((error) => {
      const message =
        "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Récupération d'un produit
productsRouter.get("/:id", (req, res) => {
  //Recherche par id
  Product.findByPk(req.params.id)
    .then((product) => {
      //Id qui n'existe pas
      if (product === null) {
        const message =
          "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        // A noter ici le return pour interrompre l'exécution du code
        return res.status(404).json({ message });
      }
      //Le produit à bien été récupéré
      const message = `Le produit dont l'id vaut ${product.id} a bien été récupéré.`;
      res.json(success(message, product));
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Création d'un produit
productsRouter.post("/", (req, res) => {
  //Crée un produit
  Product.create(req.body)
    .then((createdProduct) => {
      // Définir un message pour le consommateur de l'API REST
      const message = `Le produit ${createdProduct.name} a bien été créé !`;
      // Retourner la réponse HTTP en json avec le msg et le produit créé
      res.json(success(message, createdProduct));
    })
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
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
  //Mise a jour d'un produit
  Product.update(req.body, { where: { id: productId } })
    .then((_) => {
      //Récupération du produit mis à jour pour l'afficher
      Product.findByPk(productId)
        .then((updatedProduct) => {
          //Produit n'existe pas
          if (updatedProduct === null) {
            const message =
              "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
            // A noter ici le return pour interrompre l'exécution du code
            return res.status(404).json({ message });
          }
          //Produit existe
          // Définir un message pour l'utilisateur de l'API REST
          const message = `Le produit ${updatedProduct.name} dont l'id vaut ${updatedProduct.id} a été mis à jour avec succès`;
          // Retourner la réponse HTTP en json avec le msg et le produit créé
          res.json(success(message, updatedProduct));
        })
        //FindByPk
        .catch((error) => {
          const message =
            "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    })
    //Update
    .catch((error) => {
      const message =
        "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

export { productsRouter };

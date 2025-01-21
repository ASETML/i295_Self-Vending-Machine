import { Sequelize, DataTypes } from "sequelize";
import { ProductModel } from "../models/products.mjs";

//Info de connection à la DB
const sequelize = new Sequelize(
  "db_products", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: "6033", //pour les conteneurs docker MySQL
    dialect: "mysql",
    logging: false,
  }
);

import { products } from "./mock-product.mjs";
// Le modèle product
const Product = ProductModel(sequelize, DataTypes);
let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then((_) => {
      importProducts();
      console.log("La base de données db_products a bien été synchronisée");
    });
};

//Importe les produits dans la DB
const importProducts = () => {
  // importe tous les produits présents dans le fichier db/mock-product
  products.map((product) => {
    //On instancie le modèle pour chaque produit
    Product.create({
      name: product.name,
      price: product.price,
    }).then((product) => console.log(product.toJSON())); //Affiche le produit en json
  });
};
export { sequelize, initDb, Product };

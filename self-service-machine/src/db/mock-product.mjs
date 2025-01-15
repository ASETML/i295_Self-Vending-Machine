let products = [
  {
    id: 1,
    name: "Big Mac",
    price: 5.99,
    created: new Date(),
  },
  {
    id: 2,
    name: "Mc Nuggets",
    price: 3.49,
    created: new Date(),
  },
  {
    id: 3,
    name: "Frites",
    price: 2.99,
    created: new Date(),
  },
];

/**
 * Récupère le produit dont l'id vaut `productId`
 * @param {*} productId
 */
const getProduct = (productId) => {
  return products.find((product) => product.id == productId);
};

/**
 * Supprime le produit dont l'id vaut `productId`
 * @param {*} productId
 */
const removeProduct = (productId) => {
  products = products.filter((product) => product.id != productId); //Supprimme les produits dont l'id vaut productId
};

/**
 * Met à jour le produit dont l'id vaut `productId`
 * @param {*} productId
 * @param {*} updatedProduct
 */
const updateProduct = (productId, updatedProduct) => {
  products = products.map(
    (product) => (product.id == productId ? updatedProduct : product) //Si l'id du produit vaut productId, le produit devient updatedProduct
  );
};

const getUniqueId = (products) => {
  // On construit un tableau d'id de produits
  const productsIds = products.map((product) => product.id);

  // La fonction passée à reduce compare deux éléments à la fois (a et b) et
  // retourne le plus grand des deux grâce à Math.max.
  // Au final, reduce parcourt tout le tableau productsIds, compare chaque ID
  // avec l'ID maximal trouvé jusqu'à présent, et retourne l'ID le plus élevé,
  // qui est stocké dans la variable maxId.
  const maxId = productsIds.reduce((a, b) => Math.max(a, b));

  return maxId + 1;
};
export { products, getProduct, removeProduct, updateProduct, getUniqueId };

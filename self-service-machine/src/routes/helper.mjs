import { products } from "../db/mock-product.mjs";

//On objet de réponse
const success = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

export { success };

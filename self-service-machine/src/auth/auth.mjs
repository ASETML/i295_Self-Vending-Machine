import jwt from "jsonwebtoken";
import { privateKey } from "./private_key.mjs";

const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization; //Le jeton qui se trouve dans le header

  //Si il n'y a pas de jeton
  if (!authorizationHeader) {
    const message =
      "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.";
    return res.status(401).json({ message });
  } else {
    const token = authorizationHeader.split(" ")[1]; //Le jeton est passé sous forme "Bearer ezfsuifioduifereerefr". On enlève le "Bearer".
    //On vérifie le token
    const decodedToken = jwt.verify(
      token, //Le token
      privateKey, //La clé privée
      (error, decodedToken) => {
        //Si le token n'est pas valide
        if (error) {
          const message =
            "L'utilisateur n'est pas autorisé à accéder à cette ressource.";
          return res.status(401).json({ message, data: error });
        }
        //Le token contient l'id de l'utilisateur
        const userId = decodedToken.userId;
        //Si le token est n'est pas celui de l'utilisateur
        if (req.body.userId && req.body.userId !== userId) {
          const message = "L'identifiant de l'utilisateur est invalide";
          return res.status(401).json({ message });
        } else {
          next(); //On continue. La fonction fléchée de la route
        }
      }
    );
  }
};

export { auth };

import express from "express";
import { Section, Teacher } from "../db/sequelize.mjs";
import { ValidationError, Op } from "sequelize";
import { Product } from "../../../self-service-machine/src/db/sequelize.mjs";

const teacherRouter = express();

//Récupération de la liste des enseignants
teacherRouter.get("/", (req, res) => {
  res.json({ message: "La liste des teachers" });
});

//Récupération des détails d'un enseignant
teacherRouter.get("/:id", (req, res) => {
  Teacher.findByPk(req.params.id)
    .then((teacher) => {
      if (teacher === null) {
        const message = "Mauvais ID";
        res.status(404).json({ message: message });
      }
      console.log(teacher);
      const message = "L'enseignant à bien été récupéré";
      res.json({ message: message, data: teacher });
    })
    .catch((error) => {
      const message = "😭";
      res.status(500).json({ message, data: error });
    });
});

//Ajout d'un enseignant
teacherRouter.post("/", (req, res) => {
  const message = "L'enseignant à bien été ajouté";
  res.json({ message: message });
});

//Suppression d'un enseignant
teacherRouter.delete("/:id", (req, res) => {
  const message = "L'enseignant à bien été supprimmé";
  res.json({ message: message });
});

//Modification d'un enseignant
teacherRouter.put("/:id", (req, res) => {
  const message = "L'enseignant à bien été mis à jour";
  res.json({ message: message });
});

export { teacherRouter };

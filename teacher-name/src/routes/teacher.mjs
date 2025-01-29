import express from "express";

const teacherRouter = express();

//Récupération de la liste des enseignants
teacherRouter.get("/", (req, res) => {
  res.json({ message: "La liste des teachers" });
});

//Récupération des détails d'un enseignant
teacherRouter.get("/:id", (req, res) => {
  const message = "L'enseignant à bien été récupéré";
  res.json({ message: message });
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

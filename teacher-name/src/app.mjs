import express from "express";
import { sequelize, initDb } from "./db/sequelize.mjs";

const app = express();
const port = 3001;

app.use(express.json());

sequelize.authenticate().then((_) => {
  initDb();
  console.log("DB connectée");
});

app.get("/", (req, res) => {
  res.send("Api du surnom des enseignants");
});

import { teacherRouter } from "./routes/teacher.mjs";
app.use("/api/teachers", teacherRouter);

import { sectionRouter } from "./routes/section.mjs";
app.use("/api/sections", sectionRouter);

app.listen(port, () => {
  console.log(`L'application écoute sur le port ${port}.`);
});

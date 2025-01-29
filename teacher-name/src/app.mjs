import express from "express";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api du surnom des enseignants");
});

import { teacherRouter } from "./routes/teacher.mjs";
app.use("/api/teachers", teacherRouter);

app.listen(port, () => {
  console.log(`L'application écoute sur le port ${port}.`);
});

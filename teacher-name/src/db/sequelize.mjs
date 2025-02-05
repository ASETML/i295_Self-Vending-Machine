import { Sequelize, DataTypes } from "sequelize";
import { SectionModel } from "../models/sections.mjs";
import { TeacherModel } from "../models/teachers.mjs";
import { teachers } from "./mock-teachers.mjs";
import { sections } from "./mock-sections.mjs";

const sequelize = new Sequelize("db_teachers", "root", "root", {
  host: "localhost",
  port: 6033,
  dialect: "mysql",
  logging: false,
});

const Section = SectionModel(sequelize, DataTypes);

const Teacher = TeacherModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then(() => {
    importSections(); //Attention à la fk
    importTeachers();
    console.log("Synchro réussie");
  });
};

const importSections = () => {
  for (let section of sections) {
    Section.create({
      id: section.id,
      name: section.name,
    });
  }
};

const importTeachers = () => {
  for (let teacher of teachers) {
    Teacher.create({
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      surname: teacher.surname,
      origin: teacher.origin,
      gender: teacher.gender,
      fk_section: teacher.fk_section,
    });
  }
};

export { sequelize, Section, Teacher, initDb };

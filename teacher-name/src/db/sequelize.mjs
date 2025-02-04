import { Sequelize, DataTypes } from "sequelize";
import { SectionModel } from "../models/sections.mjs";
import { TeacherModel } from "../models/teachers.mjs";

const sequelize = new Sequelize("db_teachers", "root", "root", {
  host: "localhost",
  port: 6033,
  dialect: "mysql",
  logging: false,
});

const Section = SectionModel(sequelize, DataTypes);

const Teacher = TeacherModel(sequelize, DataTypes);

export { sequelize, Section, Teacher };

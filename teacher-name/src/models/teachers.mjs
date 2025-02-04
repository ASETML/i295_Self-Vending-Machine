import { Section } from "../db/sequelize.mjs";
const TeacherModel = (sequelize, DataTypes) => {
  return sequelize.define("Teacher", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fk_section: {
      type: DataTypes.INTEGER,
      references: {
        model: Section,
        key: "id",
      },
    },
  });
};

export { TeacherModel };

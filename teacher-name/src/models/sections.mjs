const SectionModel = (sequelize, DataTypes) => {
  return sequelize.define("Section", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export { SectionModel };

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categorys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SubCategorys, MultiSubCategorys }) {
      // define association here
      this.hasMany(SubCategorys, {
        foreignKey: "category_id",
        as: "subcategory",
      });

      this.hasMany(MultiSubCategorys, {
        foreignKey: "sub_category_id",
        as: "multicategory",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Categorys.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Categorys",
    }
  );
  return Categorys;
};

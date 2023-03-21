"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategorys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Categorys, MultiSubCategorys }) {
      // define association here
      this.belongsTo(Categorys, { foreignKey: "category_id" });
      this.hasMany(MultiSubCategorys, {
        foreignKey: "sub_category_id",
        as: "multicategory",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined, category_id: undefined };
    }
  }
  SubCategorys.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
      desc: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "SubCategorys",
    }
  );
  return SubCategorys;
};

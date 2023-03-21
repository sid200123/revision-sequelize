"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MultiSubCategorys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SubCategorys }) {
      // define association here
      this.belongsTo(SubCategorys, { foreignKey: "sub_category_id" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        category_id: undefined,
        sub_category_id: undefined,
      };
    }
  }
  MultiSubCategorys.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING, allowNull: false },
      sub_category_id: { type: DataTypes.INTEGER, allowNull: false },
      desc: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "MultiSubCategorys",
    }
  );
  return MultiSubCategorys;
};

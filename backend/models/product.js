'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    reference: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {});
  Product.associate = function (models) {
    Product.belongsTo(models.Category);
    Product.belongsToMany(models.Order, {
      through: models.OrderProduct
    });

  };
  return Product;
};
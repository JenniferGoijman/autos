'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    OrderId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    units: DataTypes.INTEGER
  }, {});
  OrderProduct.associate = function(models) {
    // associations can be defined here
    
  };
  return OrderProduct;
};
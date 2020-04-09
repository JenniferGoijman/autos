'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Order.associate = function (models) {
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct
    });
  };
  return Order;
}
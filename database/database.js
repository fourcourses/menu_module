const Sequelize = require('sequelize');
const sequelize = require('./index.js');

const { Model } = Sequelize;

class Restaurant extends Model {}
Restaurant.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'restaurant',
  timestamps: false,
});

class Menu extends Model {}
Menu.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  dishtype: {
    type: Sequelize.STRING,
  },
  subtype: {
    type: Sequelize.STRING,
  },
  dish: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  ingredients: {
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  modelName: 'menu',
  timestamps: false,
});

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

sequelize.sync();

module.exports = Menu;

const Sequelize = require('sequelize');
const sequelize = require('./index.js');

const { Model } = Sequelize;

class Menu extends Model {}
Menu.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  dishes: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: true,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'menu',
  timestamps: false,
  underscored: true,
});

sequelize.sync();

module.exports = Menu;

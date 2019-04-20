const Sequelize = require('sequelize');
const TOKEN = require('./config.js');

const sequelize = new Sequelize('restaurantmenu', 'jaytong', TOKEN, {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

// var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/restaurants')
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// module.exports = db

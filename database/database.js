const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

var menu = new mongoose.Schema({
  _id: Number,
  dishes: [{
    dish: String,
    price: Number,
    ingredients: String
  }]

})
var menus = mongoose.model('menus', menu)

module.exports = menus
var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/restaurants')
mongoose.connect('mongodb://localhost/restaurants')
mongoose.Promise = global.Promise;
var db = mongoose.connection;
module.exports = db
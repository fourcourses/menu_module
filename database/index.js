var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/restaurants')
mongoose.connect('mongodb://172.17.0.2/restaurants')
mongoose.Promise = global.Promise;
var db = mongoose.connection;
module.exports = db
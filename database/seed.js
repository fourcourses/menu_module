const db = require('./index.js')
const menu = require('./database.js')
const faker = require('faker')
var menuData = []
var dishType = ['Breakfast','Lunch','Dinner']
var subType = ['Main course','starters']
var func = () => {
  for(var x = 0;x<100;x++){
    var arr =[]
    for(var y = 0;y<30;y++){
      arr.push({
        dishType:dishType[Math.floor(Math.random()*3)],
        subType:subType[y%2],
        dish:faker.commerce.product(),
        price:faker.commerce.price(),
        ingredients: faker.commerce.productName()
      })
    }
    menuData.push({
      _id: x,
      dishes: arr
    })
  }
}
func();
const insertSampleBlogs = function() {
  menu.create(menuData)
    .then(() => db.disconnect());
};
insertSampleBlogs();
const faker = require('faker');
const fileRestaurant = require('fs').createWriteStream('database/restaurant.txt');
// use the line below if you want to generate a smaller test file
// const fileRestaurant = require('fs').createWriteStream('database/restaurantShort.txt');

const dishTypes = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Bar', 'Dessert', 'Cheese', 'Craft Cocktails & Libations', 'Afternoon Bites', 'After Dinner', 'Wines by the Glass'];
const subTypes = ['Mains', 'Starters', 'Sides', 'Raw Bar', 'Snacks', 'Appetizers', 'Classics', 'Recommendations', 'Entrees', 'Small Plates', 'Soups & Salads'];

const generateRestaurants = async () => {
  fileRestaurant.write('id|dishes|link\n');

  for (let id = 1; id <= 1e7; id += 1) {
    let link = null;
    const numberOfDishes = Math.floor(Math.random() * 10 + 10);
    const linkOrMenu = Math.floor(Math.random() * 3); // 1/3rd chance of menu being a link to menu

    const dishes = [];
    if (linkOrMenu === 0) {
      link = faker.internet.url();
    } else {
      for (let dishCount = 0; dishCount < numberOfDishes; dishCount += 1) {
        const dish = {
          dishType: dishTypes[Math.floor(Math.random() * dishTypes.length)],
          subType: subTypes[Math.floor(Math.random() * subTypes.length)],
          dish: faker.lorem.word(),
          price: parseInt(Math.random() * 85 + 15, 10),
          ingredients: faker.lorem.words(3),
        };

        dishes.push(dish);
      }
    }

    let dishesString = '{';
    for (let dishIndex = 0; dishIndex < dishes.length; dishIndex += 1) {
      if (dishIndex !== dishes.length - 1) {
        dishesString = dishesString.concat(`${JSON.stringify(dishes[dishIndex])},`);
      } else {
        dishesString = dishesString.concat(JSON.stringify(dishes[dishIndex]));
      }
    }
    dishesString = dishesString.concat('}');

    if (!fileRestaurant.write(`${id}|${dishesString}|${link}\n`)) {
      await new Promise(resolve => fileRestaurant.once('drain', resolve));
    }
  }
};

generateRestaurants();

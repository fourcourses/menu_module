const faker = require('faker');
const fileRestaurant = require('fs').createWriteStream('database/restaurant.csv');
const fileMenu = require('fs').createWriteStream('database/menu.csv');

const dishTypes = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Bar', 'Dessert', 'Cheese', 'Craft Cocktails & Libations', 'Afternoon Bites', 'After Dinner', 'Wines by the Glass'];
const subTypes = ['Mains', 'Starters', 'Sides', 'Raw Bar', 'Snacks', 'Appetizers', 'Classics', 'Recommendations', 'Entrees', 'Small Plates', 'Soups & Salads'];

const generateRestaurants = async () => {
  fileRestaurant.write('id,link\n');
  fileMenu.write('dishtype,subtype,dish,price,ingredients,restaurantId\n');

  for (let id = 1; id <= 10000000; id += 1) {
    let link = null;
    const numberOfDishes = Math.floor(Math.random() * 10 + 10);
    const linkOrMenu = Math.floor(Math.random() * 3); // 1/3rd chance of menu being a link to menu

    if (linkOrMenu === 0) {
      link = faker.internet.url();
    } else {
      for (let dishCount = 0; dishCount < numberOfDishes; dishCount += 1) {
        const dishType = dishTypes[Math.floor(Math.random() * dishTypes.length)];
        const subType = subTypes[Math.floor(Math.random() * subTypes.length)];
        const dish = faker.lorem.word();
        const price = parseInt(Math.random() * 85 + 15);
        const ingredients = faker.lorem.words(3);

        if (!fileMenu.write(`${dishType},${subType},${dish},${price},${ingredients},${id}\n`)) {
          await new Promise(resolve => fileMenu.once('drain', resolve));
        }
      }
    }

    if (!fileRestaurant.write(`${id},${link}\n`)) {
      await new Promise(resolve => fileRestaurant.once('drain', resolve));
    }
  }
};

generateRestaurants();

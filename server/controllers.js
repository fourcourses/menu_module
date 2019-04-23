const menus = require('../database/Menu');
const sequelize = require('../database/index');

exports.getMenu = (req, res) => {
  console.time('getMenuTimeLength');
  const query = `SELECT * FROM menus WHERE id = ${req.params.id};`;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(([menu, metadata]) => {
      const dishesObj = [];
      menu.dishes.forEach((dish) => {
        const dishObj = {
          dishType: dish[0].split(':')[1],
          subType: dish[1].split(':')[1],
          dish: dish[2].split(':')[1],
          price: parseInt(dish[3].split(':')[1], 10),
          ingredients: dish[4].split(':')[1],
        };
        dishesObj.push(dishObj);
      });
      menu.dishes = dishesObj;
      res.status(200);
      res.send(menu);
      console.timeEnd('getMenuTimeLength');
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
      console.timeEnd('getMenuTimeLength');
    });
};

exports.createMenu = (req, res) => {
  console.time('createMenuTimeLength');
  menus.findOrCreate({ where: { id: req.body.id }, defaults: { dishes: req.body.dishes, link: req.body.link } })
    .then(([menu, created]) => {
      console.log(menu);
      res.send(created);
      console.timeEnd('createMenuTimeLength');
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
      console.timeEnd('createMenuTimeLength');
    });
};

exports.updateMenu = (req, res) => {
  console.time('updateMenuTimeLength');
  menus.findOne({ where: { id: req.params.id } })
    .then((menu) => {
      if (menu) {
        menu.update({
          dishes: req.body.dishes,
          link: req.body.link,
        });
      }
      console.timeEnd('updateMenuTimeLength');
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
      console.timeEnd('updateMenuTimeLength');
    });
};

exports.deleteMenu = (req, res) => {
  console.time('deleteMenuTimeLength');
  menus.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send('Menu deleted');
      console.timeEnd('deleteMenuTimeLength');
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
      console.timeEnd('deleteMenuTimeLength');
    });
};

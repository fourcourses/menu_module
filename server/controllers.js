const menus = require('../database/Menu');

exports.getMenu = (req, res) => {
  menus.findOne({ where: { id: req.params.id } })
    .then((menu) => {
      const dishesObj = [];
      menu.dishes.forEach((dish) => {
        const dishObj = {
          dishType: dish[0].split(':')[1],
          subType: dish[1].split(':')[1],
          dish: dish[2].split(':')[1],
          price: parseInt(dish[3].split(':')[1]),
          ingredients: dish[4].split(':')[1],
        };
        dishesObj.push(dishObj);
      });
      menu.dishes = dishesObj;
      res.status(200);
      res.send(menu);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
};

exports.createMenu = (req, res) => {
  menus.findOrCreate({ where: { id: req.body.id }, defaults: { dishes: req.body.dishes, link: req.body.link } })
    .then(([menu, created]) => {
      console.log(menu);
      res.send(created);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
};

exports.updateMenu = (req, res) => {
  menus.findOne({ where: { id: req.params.id } })
    .then((menu) => {
      if (menu) {
        menu.update({
          dishes: req.body.dishes,
          link: req.body.link,
        });
      }
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
};

exports.deleteMenu = (req, res) => {
  menus.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send('Menu deleted');
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
};

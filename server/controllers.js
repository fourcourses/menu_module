const cassandra = require('cassandra-driver');
const menus = require('../database/Menu');
const sequelize = require('../database/index');
// const cassandra = require('../cassandradb/index');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'restaurantmenu' });

exports.getMenu = (req, res) => {
  const idInteger = parseInt(req.params.id);
  client.execute('SELECT * FROM menu where id = ? limit 1', [idInteger], { prepare: true }, (err, result) => {
    const resultFormatted = result.first();
    resultFormatted.dishes = JSON.parse(resultFormatted.dishes);
    res.status(200);
    res.send(resultFormatted);
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

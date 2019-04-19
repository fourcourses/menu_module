const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const menus = require('../database/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "../public")))

app.use("/restaurants/:id",express.static(path.join(__dirname, "../public")))

app.get('/menu/:id', (req, res) => {
  menus.findOne({ where: { id: req.params.id } })
    .then(menu => res.send(menu))
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

app.post('/menu', (req, res) => {
  menus.findOrCreate({ where: { id: req.body.id }, defaults: { dishes: req.body.dishes, link: req.body.link } })
    .then(([menu, created]) => {
      console.log(menu);
      res.send(created);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

app.put('/menu/:id', (req, res) => {
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
});

app.delete('/menu/:id', (req, res) => {
  menus.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send('Menu deleted');
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});


app.listen(3003, () => console.log('listening on port 3003'))
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const menus = require('../database/database.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "../public")))

app.use("/restaurants/:id",express.static(path.join(__dirname, "../public")))

app.get('/menu/:id', (req, res) => {
  menus.findById(req.params.id, (err, menus) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(menus);
    }
  });
});

app.post('/menu', (req, res) => {
  menus.create(req.params.id, (err, menus) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(menus);
    }
  });
});

app.put('/menu/:id', (req, res) => {
  menus.findByIdAndUpdate(req.params.id, (err, menus) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(menus);
    }
  });
});

app.delete('/menu/:id', (req, res) => {
  menus.findByIdAndDelete(req.params.id, (err, menus) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(menus);
    }
  });
});


app.listen(3003, () => console.log('listening on port 3003'))
const newRelic = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require('./controllers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/restaurants/:id', express.static(path.join(__dirname, '../public')));

app.get('/menu/:id', getMenu);

app.post('/menu', createMenu);

app.put('/menu/:id', updateMenu);

app.delete('/menu/:id', deleteMenu);

app.listen(3003, () => console.log('listening on port 3003'));

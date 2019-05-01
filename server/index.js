// const nr = require('newrelic');
const express = require('express');
const path = require('path');
// const spdy = require('spdy');
const fs = require('fs');
const redis = require('redis');
const redisClient = redis.createClient();
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'restaurantmenu' });
// const {
//   getMenu,
//   createMenu,
//   updateMenu,
//   deleteMenu,
// } = require('./controllers');

const app = express();
// const options = {
//   key: fs.readFileSync(__dirname + '/server.key'),
//   cert: fs.readFileSync(__dirname + '/server.crt'),
//   requestCert: false,
//   rejectUnauthorized: false,
// };
const port = 3003;

// spdy
//   .createServer(options, app)
//   .listen(port, () => {
//     console.log('Listening on port: ' + port + '.');
//   });

app.use(express.static(path.join(__dirname, '../public')));
app.use('/restaurants/:id', express.static(path.join(__dirname, '../public')));

const getMenu = (req, res) => {
  const idInteger = parseInt(req.params.id);
  client.execute('SELECT * FROM menu where id = ? limit 1', [idInteger], { prepare: true }, (err, result) => {
    if (err) {
      res.status(400);
      res.send('The restaurant is not found.');
    }
    const resultFormatted = result.first();
    resultFormatted.dishes = JSON.parse(resultFormatted.dishes);
    redisClient.setex(idInteger, 3600, JSON.stringify(resultFormatted));
    res.status(200);
    res.send(resultFormatted);
  });
};

const getCache = (req, res) => {
  let id = req.params.id;
  redisClient.mget(id, (err, result) => {
    if (result[0] !== null) {
      res.send(JSON.parse(result[0]));
    } else {
      getMenu(req, res);
    }
  });
};

app.get('/menu/:id', getCache);
// app.get('/menu/:id', getMenu);

// app.post('/menu', createMenu);

// app.put('/menu/:id', updateMenu);

// app.delete('/menu/:id', deleteMenu);

app.listen(port, () => console.log(`listening on port ${port}`));


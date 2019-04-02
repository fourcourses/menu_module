const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const menus = require('../database/database.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "../public")))
app.get('/menu:id', (req, res) => {
  console.log('get request')
  menus.findById(req.params.id, (err, menus) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      console.log(menus)
      res.send(menus)
    }
  })
})
app.listen(3000, () => console.log('listening on port 3000'))
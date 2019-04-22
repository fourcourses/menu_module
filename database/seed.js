const db = require('./index.js');

db.query(`COPY menus FROM '/Users/jaytong/Dropbox/hackreactor/menu-module/database/restaurant.txt' (FORMAT CSV, DELIMITER ('|'), HEADER);`)
  .then(() => console.log('restaurants loaded!'));

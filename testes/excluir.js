const db = require('../config/database');

db('perfis').where({ id: 1})
  .delete()
  .then(res => console.log(res))
  .finally(() => db.destroy());


// db('perfis')
//   .delete()
//   .then(res => console.log(res))
//   .finally(() => db.destroy());

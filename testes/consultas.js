const db = require('../config/database');

// db('perfis')
//   .then(res => console.log(res))
//   .finally(() => db.destroy());


// db('perfis').select('nome')
//   .then(res => console.log(res))
//   .finally(() => db.destroy());


// db.select('nome', 'id')
//   .from('perfis')
//   .then(res => console.log(res))
//   .finally(() => db.destroy());


// db('perfis')
//   .limit(4).offset(2)
//   .then(res => console.log(res))
//   .finally(() => db.destroy());


// db('perfis')
//   .where({ id: 2 })
//   .then(res => console.log(res))
//   .finally(() => db.destroy());


db('perfis')
  .whereIn('id', [1, 2])
  .then(res => console.log(res))
  .finally(() => db.destroy());

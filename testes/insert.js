const db = require('../config/database');

const novoPerfil = {
  nome: 'cadastrador3',
  rotulo: 'Cadastrador3',
};

db('perfis').insert(novoPerfil)
  .then(res => console.log(res, '456'))
  .finally(() => db.destroy());

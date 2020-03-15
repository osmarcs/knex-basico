const db = require('../../config/database');

module.exports = {
  perfis() {
    return db('perfis');
  },
  perfil(_, { filtro }) {
    const { id, nome } = filtro;

    if(id) {
      return db('perfis').where({ id: id }).first();
    } else if (nome) {
      return db('perfis').where({ nome }).first();
    } else {
      return null;
    }

  }
}

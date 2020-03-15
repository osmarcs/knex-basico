const db = require('../../config/database');

module.exports = {
  usuarios() {
    return db('usuarios');
  },
  usuario(_, { filtro }) {
    const { id, nome, email } = filtro;

    if(id) {
      return db('usuarios').where({ id: id }).first();
    } else if (nome) {
      return db('usuarios').where({ nome }).first();
    } else if (email) {
      return db('usuarios').where({ email }).first();
    } else {
      return null;
    }
  }
}

const db = require('../../config/database');
const bcrypt = require('bcrypt');
const { getUsuarioLogado } = require('../comum/usuario');

module.exports = {

  async login(_, { dados }) {
    const prsDados = JSON.parse(JSON.stringify(dados));
    const usuario = await db('usuarios').where({
      email: prsDados.email
    }).first();

    if (!usuario) {
      throw Error('Usuario nao encontrado!')
    }

    const saoIguais = bcrypt.compareSync(prsDados.senha, usuario.senha);
    if(!saoIguais) {
      throw Error('Senha invalida ')
    }

    return getUsuarioLogado(usuario);

  },

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

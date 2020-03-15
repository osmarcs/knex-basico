const db = require('../../config/database');
const { perfil: obterPerfil } = require('../Query/perfis');

module.exports = {
  async adicionarPerfil(_, { dados }) {
    try {
      const [ id ] = await db('perfis').insert(dados);
      return db('perfis').where({ id }).first();
    } catch (error) {
      console.log(error)
    }
  },
  async alterarPerfil(_, { filtro, dados }) {
    const perfil = await obterPerfil(_, { filtro });
    if (perfil) {
      return null;
    }

    try {
      await db('perfis').where({ id: perfil.id }).update(dados);
      return {...perfil, ...dados};
    } catch (error) {
      console.log(error)
    }
  },
  async deletarPerfil(_, { filtro }) {
    const perfil = await obterPerfil(_, { filtro });
    if (perfil) {
      return null;
    }

    try {
      await db('usuarios_perfis').where({ perfil_id: perfil.id }).delete();
      await db('perfis').where({ id: perfil.id }).delete();
      return perfil;
    } catch (error) {
      console.log(error)
    }
  }
}

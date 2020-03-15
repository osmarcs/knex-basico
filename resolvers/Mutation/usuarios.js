const db = require('../../config/database');
const { perfil: obterPerfil } = require('../Query/perfis');
const { usuario: obterUsuario } = require('../Query/usuarios');

module.exports = {
  async adicionarUsuario(_, { dados }) {
    const perfis_id = [];
    try {
      if (dados.perfis) {
        for ( let  { _,  ...filtro } of dados.perfis ) {
          const perfil = await obterPerfil(_, { filtro });
          if (perfil) {
            perfis_id.push(perfil.id);
          }
        }
      }

      delete dados.perfis;
      const [ id ] = await db('usuarios').insert(dados);
      for(let perfil_id of perfis_id) {
        await db('usuarios_perfis').insert({
          perfil_id,
          usuario_id: id
        })
      }
      return db('usuarios').where({ id }).first();

    } catch (error) {
      console.log(error);
      return null
    }
  },
  async alterarUsuario(_, { filtro, dados }) {
    try {
      const usuario = await obterUsuario(_, { filtro});
      if (!usuario) {
        return null
      }
      if (dados.perfis) {
        await db('usuarios_perfis').where({ usuario_id: usuario.id }).delete();
        for ( let  { _,  ...filtro } of dados.perfis ) {
          const perfil = await obterPerfil(_, { filtro });
          if (perfil) {
            await db('usuarios_perfis').insert({ usuario_id: usuario.id, perfil_id: perfil.id})
          }
        }
      }
      delete dados.perfis;
      await db('usuarios').where({ id: usuario.id }).update(dados);
      return { ...usuario, ...dados};

    } catch (error) {
      console.log(error);
      return null
    }
  },
  async deletarUsuario(_, { filtro }) {
    try {
      const usuario = await obterUsuario(_, { filtro });
      if (usuario) {
        await db('usuarios_perfis').where({ usuario_id: usuario.id }).delete();
        await db('usuarios').where({ id: usuario.id }).delete();
      }
      return usuario;
    } catch (error) {
      console.log(error);
      return null
    }
  }
}

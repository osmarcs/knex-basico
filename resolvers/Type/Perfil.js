const db = require('../../config/database');

module.exports = {
  async usuarios(perfil) {
    return db('usuarios').join(
      'usuarios_perfis',
      'usuarios.id',
      'usuarios_perfis.usuario_id'
    ).where({ perfil_id: perfil.id })
  }
}

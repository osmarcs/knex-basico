const db = require('../config/database');

const tb_usuarios = 'usuarios';
const tb_perfis = 'perfis';
const tb_usuarios_perfis = 'usuarios_perfis';


async function salvarUsuario(nome, email, senha) {
  let usuario = await db(tb_usuarios).where({ email }).first();

  if (usuario) {
    await db(tb_usuarios).where({ email }).update({
      nome,
      email,
      senha
    });
    usuario = { ...usuario, nome, email, senha}
  } else {
    const [ id ] = await db(tb_usuarios).insert({ nome, email, senha });
    usuario = await db(tb_usuarios).where({ id }).first();
  }
  return usuario;
}

async function salvarPerfil(nome, rotulo) {
  let perfil = await db(tb_perfis).where({ nome }).first();

  if (perfil) {
    await db(tb_perfis).where({ nome }).update({
      nome,
      rotulo,
    });
    perfil = { ...perfil, nome, rotulo}
  } else {
    const [ id ] = await db(tb_perfis).insert({ nome, rotulo });
    perfil = await db(tb_perfis).where({ id }).first();
  }
  return perfil;
}

async function associarUsuariosPerfis(usuario, ...perfis) {
  await db(tb_usuarios_perfis).where({ usuario_id: usuario.id }).delete();
  for (perfil of perfis) {
    await db(tb_usuarios_perfis).insert({
      usuario_id: usuario.id,
      perfil_id: perfil.id
    });
  }
}


async function executar() {
  const usuario = await salvarUsuario('Test1', 'test1@gmail.com', 1223242);
  const perfil1 = await salvarPerfil('rh', 'RH');
  const perfil2 = await salvarPerfil('fin', 'Financeiro');
  await associarUsuariosPerfis(usuario, perfil1, perfil2);

  console.log('usuario', usuario);
  console.log('perfil1', perfil1);
  console.log('perfil2', perfil2);
}

executar()
  .catch(err => console.log('Erro', err))
  .finally(() => db.destroy());


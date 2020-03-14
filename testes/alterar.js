const db = require('../config/database');

const novoUsuario = {
  nome: "Teste",
  email: "test@test.com",
  senha: 12345
}

async function exercicio() {
  const { qtd } = await db('usuarios').count({ qtd: '*' }).first();

  if (!qtd) {
    await db.insert(novoUsuario).into('usuarios');
  }

  await db('usuarios').update({
    senha: 9876
  });

  return db('usuarios').first();
}

exercicio()
  .then(res => console.log(res))
  .finally(() => db.destroy());

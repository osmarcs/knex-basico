const usuarios = require("./usuarios");
const perfis = require("./perfis");


module.exports = {
  ...usuarios,
  ...perfis
}

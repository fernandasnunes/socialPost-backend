var User = require("../models/user");

let registerUser = function (name, age, email) {
  return new Promise(async function (resolve, reject) {
    try {
      //Verifica se o usuário já existe

      let usuarioEmail = await User.findOne({
        email: email,
      });

      if (usuarioEmail) return reject("Usuário já cadastrado");

      //Cria e salva um novo usuário
      var newUser = new User({
        name: name,
        age: age,
        email: email,
      });
      return resolve(newUser.save());
    } catch (err) {
      return reject("Erro ao registrar usuário: " + err);
    }
  });
};

module.exports = {
  registerUser: registerUser,
};

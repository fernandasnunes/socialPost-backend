var User = require("../models/user");

let registerUser = function (name, age, email) {
  return new Promise(async function (resolve, reject) {
    try {
      let usuarioEmail = await User.findOne({
        email: email,
      });

      if (usuarioEmail) return reject("usuario já cadastrado");

      var newUser = new User({
        name: name,
        age: age,
        email: email
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

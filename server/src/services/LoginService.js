const db = require("../db");

module.exports = {
  login: (email, senha) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
        [email, senha],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results.length > 0) {
            console.log(results[0]);
            resolve({id: results[0].id, msg: "Usuário logado com sucesso"});
          } else {
            resolve("Usuário não está cadastrado");
          }
        }
      );
    });
  },
};

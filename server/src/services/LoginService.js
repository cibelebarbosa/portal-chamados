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
            resolve({id: results[0].id, msg: "Usuário logado com sucesso", canAccess: true});
          } else {
            resolve({msg: "Usuário não está cadastrado", canAccess: false});
          }
        }
      );
    });
  },

  save: (email, senha) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
        [email, senha],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results.insertId);
        }
      );
    });
  },
};

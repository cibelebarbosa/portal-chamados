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
            resolve({id: results[0].id_coordenador, msg: "Usuário logado com sucesso", canAccess: true});
          } else {
            resolve({msg: "Usuário não está cadastrado", canAccess: false});
          }
        }
      );
    });
  },

  save: (email, senha, id_coordenador) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO usuarios (id_coordenador, email, senha) VALUES (?, ?, ?)",
        [id_coordenador, email, senha],
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

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM usuarios", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("delete from usuarios WHERE id_coordenador = ?", 
      [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
};

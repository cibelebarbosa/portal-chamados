const db = require("../db");

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM chamados", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM chamados WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        }
      );
    });
  },

  getAllByStatus: (status) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM chamados WHERE status = ?",
        [status],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            resolve(results);
          } else {
            resolve(false);
          }
        }
      );
    });
  },

  save: (titulo, descricao, status, ra, curso, telefone, aluno) => {
    return new Promise((resolve, reject) => {
      console.log(titulo, descricao, status, ra, curso, telefone, aluno);
      db.query(
        "INSERT INTO chamados (titulo, descricao, status, ra, telefone, curso, aluno) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [titulo, descricao, status, ra, telefone, curso, aluno],
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

  update: (id, titulo, descricao, status, aluno, comentario) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE chamados SET titulo = ?, descricao = ?, status = ?, aluno = ?, comentario = ? WHERE id = ?",
        [titulo, descricao, status, aluno, comentario, id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM chamados WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },

  getCursos: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM cursos", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
};

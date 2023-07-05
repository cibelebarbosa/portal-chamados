const db = require("../db");

module.exports = {
  saveCoordenador: (nome, email) => {
    return new Promise((resolve, reject) => {
      let idCoordenador;
      db.query(
        "INSERT INTO coordenadores (nome, email) VALUES (?, ?)",
        [nome, email],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          idCoordenador = results.insertId;
          resolve(results.insertId);
        }
      );
    });
  },

  saveEscala: (coordenador, escala) => {
    return new Promise((resolve, reject) => {
      escala.forEach((e) => {
        db.query(
          "INSERT INTO escalas (id_coordenador, dia, horaInicio, horaFim) VALUES (?, ?, ?, ?)",
          [coordenador, e.dia, e.horaInicio, e.horaFim],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          }
        );
      });
    });
  },

  getByIdCoordenador: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM coordenadores where id = ?",
        [id],
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

  getByIdEscalas: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT dia, horaInicio, horaFim FROM escalas where id_coordenador = ?",
        [id],
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

  getAllCoordenadores: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM coordenadores", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },

  getAllDiasDominio: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM diaSemana", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },

  getAllCoordenadoresEscalasByDia: (dia) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, nome, id_coordenador, dia, horaInicio, horaFim FROM coordenadores INNER JOIN escalas ON id_coordenador = id where dia = ?",
      [dia], 
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },

  getAllCoordenadoresEscalas: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, nome, id_coordenador, dia, horaInicio, horaFim FROM coordenadores INNER JOIN escalas ON id_coordenador = id",
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },

  updateEscalas: (id, escala) => {
    console.log(escala);
    return new Promise((resolve, reject) => {
      escala.forEach((e) => {
        db.query(
          "UPDATE escalas SET horaInicio = ?, horaFim = ? WHERE id_coordenador = ? and dia = ?",
          [e.horaInicio, e.horaFim, id, e.dia],
          (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          }
        );
      });
    });
  },

  deleteCoordenadores: (id) => {
    return new Promise((resolve, reject) => {
      db.query("delete from coordenadores WHERE id = ?", 
      [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  
  deleteEscalas: (id) => {
    return new Promise((resolve, reject) => {
      db.query("delete from escalas WHERE id_coordenador = ?", 
      [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }
};

const CoordenadorService = require("../services/CoordenadorService");
const LoginService = require("../services/LoginService");

module.exports = {
  getAllCoordenadores: async (req, res) => {
    let json = { error: "", result: [] };
    let coordenadores = await CoordenadorService.getAllCoordenadores();

    for (let i in coordenadores) {
      json.result.push({
        id: coordenadores[i].id,
        nome: coordenadores[i].nome,
        email: coordenadores[i].email,
      });
    }
    res.json(json.result);
  },

  getById: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let coordenador = await CoordenadorService.getByIdCoordenador(id);
    let escalas = await CoordenadorService.getByIdEscalas(id);

    if (coordenador && escalas) {
      let returnObj = {
        coordenador,
        escalas: escalas,
      };
      json.result = returnObj;
    }

    res.json(json);
  },

  save: async (req, res) => {
    let json = { error: "", result: {} };

    let nome = req.body.nome;
    let email = req.body.email;
    let escala = req.body.escala.filter((n) => n);

    if (nome !== undefined && email !== undefined && escala !== undefined) {
      let coordenador = await CoordenadorService.saveCoordenador(
        nome,
        email,
        escala
      );
      let escalas = await CoordenadorService.saveEscala(coordenador, escala);
      json.result = {
        id: coordenador,
        nome,
        email,
        escala,
      };
    } else {
      json.error = "Campos inválidos";
    }

    res.json(json);
  },

  updateCoordenador: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let escala = req.body.escala.filter((n) => n);

    if (
      id &&
      nome !== undefined &&
      email !== undefined &&
      escala !== undefined
    ) {
      await CoordenadorService.updateEscalas(id, escala);
      json.result = {
        id,
        nome,
        email,
        escala,
      };
    } else {
      json.error = "Campos inválidos";
    }

    res.json(json);
  },

  delete: async (req, res) => {
    let json = { error: "", result: {} };
    await CoordenadorService.deleteEscalas(req.params.id);
    await CoordenadorService.deleteCoordenadores(req.params.id);
    res.json(json);
  },
};
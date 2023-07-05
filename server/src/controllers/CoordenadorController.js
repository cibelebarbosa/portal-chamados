const CoordenadorService = require("../services/CoordenadorService");
const LoginService = require("../services/LoginService");

module.exports = {
  getAllCoordenadores: async (req, res) => {
    let json = { error: "", result: [] };
    let query = req.query;
    let coordenadores = await CoordenadorService.getAllCoordenadores();

    if (query.dia && query.dia != "null") {
      let coordenadoresEscalas =
        await CoordenadorService.getAllCoordenadoresEscalasByDia(query.dia);
      for (let i in coordenadoresEscalas) {
        json.result.push({
          id: coordenadoresEscalas[i].id,
          nome: coordenadoresEscalas[i].nome,
          id_coordenador: coordenadoresEscalas[i].id_coordenador,
          dia: coordenadoresEscalas[i].dia,
          horaInicio: coordenadoresEscalas[i].horaInicio,
          horaFim: coordenadoresEscalas[i].horaFim,
        });
      }
    } else if (query.dia && query.dia == "null") {
      let coordenadoresEscalas =
        await CoordenadorService.getAllCoordenadoresEscalas();
      for (let i in coordenadoresEscalas) {
        json.result.push({
          id: coordenadoresEscalas[i].id,
          nome: coordenadoresEscalas[i].nome,
          id_coordenador: coordenadoresEscalas[i].id_coordenador,
          dia: coordenadoresEscalas[i].dia,
          horaInicio: coordenadoresEscalas[i].horaInicio,
          horaFim: coordenadoresEscalas[i].horaFim,
        });
      }
    } else {
      for (let i in coordenadores) {
        json.result.push({
          id: coordenadores[i].id,
          nome: coordenadores[i].nome,
          email: coordenadores[i].email,
        });
      }
    }
    res.json(json.result);
  },

  getAllDiasDominio: async (req, res) => {
    let json = { error: "", result: [] };
    let dias = await CoordenadorService.getAllDiasDominio();

    for (let i in dias) {
      json.result.push({
        id: dias[i].id,
        dia: dias[i].dia,
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
        coordenador: coordenador[0],
        escalas,
      };
      json.result = returnObj;
    }

    res.json(json);
  },

  save: async (req, res) => {
    let json = { error: "", result: {} };

    let coordenador = req.body.coordenador;
    let escala = req.body.escalas;

    let coordenadorId = await CoordenadorService.saveCoordenador(
      coordenador.nome,
      coordenador.email,
      escala
    );

    let escalas = await CoordenadorService.saveEscala(coordenadorId, escala);

    json.result = {
      id: coordenadorId,
      coordenador,
      escala,
    };

    res.json(json);
  },

  updateCoordenador: async (req, res) => {
    let json = { error: "", result: {} };

    let coordenador = req.body.coordenador;
    let escala = req.body.escalas;

    let coord = await CoordenadorService.getByIdCoordenador(coordenador.id);
    let escalas = await CoordenadorService.getByIdEscalas(coordenador.id);

    let returnObj = { coordenador: coord[0], escalas };

    escalaUpdate = [];
    escalaInsert = [];

    returnObj.escalas.forEach((element) => {
      escalaUpdate.push(escala.filter((e) => JSON.stringify(element) === JSON.stringify(e))[0]);
      escalaInsert.push(escala.filter((e) => JSON.stringify(element) !== JSON.stringify(e))[0]);
    });

    if(escalaUpdate){
      CoordenadorService.updateEscalas(coordenador.id, escalaUpdate)
    }

    console.log(escalaUpdate);
    // console.log(escalaInsert);

    res.json(json);
  },

  delete: async (req, res) => {
    let json = { error: "", result: {} };
    await CoordenadorService.deleteEscalas(req.params.id);
    await CoordenadorService.deleteCoordenadores(req.params.id);
    res.json(json);
  },
};

const ChamadoService = require("../services/ChamadoService");

module.exports = {
  getAll: async (req, res) => {
    let json = { error: "", result: [] };

    let chamados = await ChamadoService.getAll();

    for (let i in chamados) {
      json.result.push({
        id: chamados[i].id,
        titulo: chamados[i].titulo,
        descricao: chamados[i].descricao,
        status: chamados[i].status,
        aluno: chamados[i].aluno,
        data_registro: chamados[i].data_registro,
      });
    }
    res.json(json);
  },

  getById: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let chamado = await ChamadoService.getById(id);

    if (chamado) {
      json.result = chamado;
    }

    res.json(json);
  },

  save: async (req, res) => {
    let json = { error: "", result: {} };

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    let status = req.body.status;
    let aluno = req.body.aluno;

    console.log(titulo, descricao, status, aluno);

    if (
      titulo !== undefined &&
      descricao !== undefined &&
      status !== undefined &&
      aluno !== undefined
    ) {
      let chamado = await ChamadoService.save(titulo, descricao, status, aluno);
      json.result = {
        id: chamado,
        titulo,
        descricao,
        status,
        aluno,
      };
    } else {
      json.error = "Campos inválidos";
    }

    res.json(json);
  },

  update: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    let status = req.body.status;
    let aluno = req.body.aluno;

    if (
      id &&
      titulo !== undefined &&
      descricao !== undefined &&
      status !== undefined &&
      aluno !== undefined
    ) {
      await ChamadoService.update(id, titulo, descricao, status, aluno);
      json.result = {
        id,
        titulo,
        descricao,
        status,
        aluno,
      };
    } else {
      json.error = "Campos inválidos";
    }

    res.json(json);
  },

  delete: async (req, res) => {
    let json = { error: "", result: {} };

    await ChamadoService.delete(req.params.id);

    res.json(json);
  },
};

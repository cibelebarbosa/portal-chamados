const ChamadoService = require("../services/ChamadoService");

module.exports = {
  getAll: async (req, res) => {
    let json = { error: "", result: [] };
    let query = req.query;
    let chamados = await ChamadoService.getAll();

    for (let i in chamados) {
      json.result.push({
        id: chamados[i].id,
        titulo: chamados[i].titulo,
        descricao: chamados[i].descricao,
        status: chamados[i].status,
        coordenador: chamados[i].coordenador,
        data_registro: chamados[i].data_registro,
        data_conclusao: chamados[i].data_conclusao,
      });
    }
    let jsonFiltrado = [];
    if (query.status) {
      json.result.forEach((item) => {
        if (item.status == query.status) {
          jsonFiltrado.push(item);
        } else {
          return;
        }
      });
      json.result = jsonFiltrado;
    } else if (query.coordenador) {
      json.result.forEach((item) => {
        if (item.coordenador == query.coordenador) {
          jsonFiltrado.push(item);
        } else {
          return;
        }
      });
      json.result = jsonFiltrado;
    }

    res.json(json);
  },

  getAllById: async (req, res) => {
    let json = { error: "", result: {} };

    let id = req.params.id;
    let chamados = await ChamadoService.getAllById(id);

    if (chamados) {
      json.result = chamados;
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
    let status = 0;
    let aluno = req.body.aluno;
    let ra = req.body.ra;
    let coordenador = req.body.coordenador;
    let telefone = req.body.telefone;

    if (
      titulo !== undefined &&
      descricao !== undefined &&
      status !== undefined &&
      aluno !== undefined &&
      ra !== undefined &&
      coordenador !== undefined &&
      telefone !== undefined
    ) {
      let chamado = await ChamadoService.save(
        titulo,
        descricao,
        status,
        ra,
        coordenador,
        telefone,
        aluno
      );
      json.result = {
        id: chamado,
        titulo,
        descricao,
        status,
        aluno,
        ra,
        coordenador,
        telefone,
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
    let coordenador = req.body.coordenador;
    let comentario = req.body.comentario;
    let data_conclusao = req.body.data_conclusao;

    if (
      id &&
      titulo !== undefined &&
      descricao !== undefined &&
      status !== undefined &&
      coordenador !== undefined &&
      comentario !== undefined
    ) {
      await ChamadoService.update(
        id,
        titulo,
        descricao,
        status,
        coordenador,
        comentario,
        data_conclusao
      );
      json.result = {
        id,
        titulo,
        descricao,
        status,
        coordenador,
        comentario,
        data_conclusao,
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

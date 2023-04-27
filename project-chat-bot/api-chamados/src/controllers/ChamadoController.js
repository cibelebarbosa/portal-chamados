const ChamadoService = require("../services/ChamadoService");

module.exports = {
  getAll: async (req, res) => {
    let json = { error: "", result: [] };
    let status = req.query;
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
    let jsonFiltrado = [];
    if (status.status) {
      json.result.forEach((item) => {
        if (item.status == status.status) {
          jsonFiltrado.push(item);
        } else {
          return;
        }
      });
      json.result = jsonFiltrado;
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
    let curso = req.body.curso;
    let telefone = req.body.telefone;


    if (
      titulo !== undefined &&
      descricao !== undefined &&
      status !== undefined &&
      aluno !== undefined &&
      ra !== undefined &&
      curso !== undefined &&
      telefone !== undefined
    ) {
      let chamado = await ChamadoService.save(
        titulo,
        descricao,
        status,
        ra,
        curso,
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
        curso,
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

  getCursos: async (req, res) => {
    let json = { error: "", result: [] };

    let cursos = await ChamadoService.getCursos();

    for (let i in cursos) {
      json.result.push({
        id: cursos[i].id,
        curso: cursos[i].curso,
      });
    }
    res.json(json);
  },
};

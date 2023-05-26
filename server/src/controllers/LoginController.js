const LoginService = require("../services/LoginService");

module.exports = {
  login: async (req, res) => {
    let json = { error: "", result: {} };

    let email = req.body.email;
    let senha = req.body.senha;

    if (email !== undefined && senha !== undefined) {
      let login = await LoginService.login(email, senha);
      json.result = { message: login };
    } else {
      json.error = "erro";
    }
    res.json(json);
  },

  save: async (req, res) => {
    let json = { error: "", result: {} };

    let email = req.body.email;
    let senha = req.body.senha;

    if (email !== undefined && senha !== undefined) {
      let login = await LoginService.save(email, senha);
      json.result = {
        id: login,
        email,
        senha,
      };
    } else {
      json.error = "Campos inválidos";
    }

    res.json(json);
  },
};

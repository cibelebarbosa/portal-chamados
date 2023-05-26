const NodemailerService = require("../services/NodemailerService");

module.exports = {
  sendEmail: async (req, res, next) => {
    let json = { error: "", result: {} };
    const mensagem = req.body.mensagem;
    const email = req.body.email;

    let respEmail = await NodemailerService.sendEmail(email, mensagem);  
    
    json.result = respEmail;
  },
};

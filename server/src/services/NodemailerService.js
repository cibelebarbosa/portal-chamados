const mailer = require("nodemailer");

module.exports = {
  sendEmail: (email, mensagem) => {
    const smtpTransport = mailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, //SSL/TLS
      auth: {
        user: "nao.responda.sac.anhanguera@gmail.com",
        pass: "bhvitzejshiynjur",
      },
    });

    const mail = {
      from: "Sac anhanguera <nao.responda.sac.anhanguera@gmail.com>",
      to: email,
      subject: `Chamado aberto`,
      html: mensagem,
    };

    return new Promise((resolve, reject) => {
      smtpTransport
        .sendMail(mail)
        .then((response) => {
          smtpTransport.close();
          return resolve(response);
        })
        .catch((error) => {
          smtpTransport.close();
          return reject(error);
        });
    });
  },
};

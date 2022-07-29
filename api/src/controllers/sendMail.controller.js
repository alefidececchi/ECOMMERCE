const nodemailer = require("nodemailer");

const sendMailActivate = (token, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samirjose675",
      pass: "zgimctzowdiuaozx",
    },
  });

  var mailOptions = {
    from: "samirjose675@gmail.com",
    to: `${email}`,
    subject: "Enviado desde libritos.com",
    text: `Haz click en el siguien link para activar su cuenta: ${process.env.CLIENT_URL}/activate-account/${token}`,

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("Email enviado.");
      res.status(200).json(req.body);
    }
  });
};

const sendMailForgot = (token, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "samirjose675",
      pass: "zgimctzowdiuaozx",
    },
  });

  var mailOptions = {
    from: "samirjose675@gmail.com",
    to: `${email}`,
    subject: "Enviado desde libritos.com",
    text: `Please click on given link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("Email enviado.");
      res.status(200).json(req.body);
    }
  });
};

module.exports = {
  sendMailActivate,
  sendMailForgot
};

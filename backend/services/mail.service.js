const nodemailer = require("nodemailer");
const config = require('../config')

const mailClient = 'zoho'

switch (mailClient) {
  case 'zoho':
    var transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASS
      }
    });
    break
  case 'gmail':
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASS
      }
    });
  case 'outlook':
    var transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASS
      }
    });
  default:
    console.log("Select a mailing client, and enter credentials in variables.env/config.js")
}

module.exports.sendPasswordReset =  (recipient, token) => {
  var mailOptions = {
    from: `${config.APP_NAME} <${config.MAIL_USER}>`, // sender address (who sends)
    to: recipient, // list of receivers (who receives)
    subject: `Reset your ${config.APP_NAME} password`, // Subject line
    text: `Hello\n\n
    We received a password reset request for your account. Click the link below
    to enter a new password. If you didn't request a password reset, you can
    safely ignore this email.\n\n
    http://localhost:3000/reset/${recipient}/${encodeURIComponent(token)}`, // plaintext body
    html: `<h2>Hello</h2>
    <p> We received a password reset request for your account. Click
    <a href="http://localhost:3000/reset/${recipient}/${encodeURIComponent(token)}">the link below</a>
    to enter a new password. If you didn't request a password reset, you can
    safely ignore this email.</p> <br/> <br/>
    http://localhost:3000/reset/${recipient}/${encodeURIComponent(token)}` // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }

    console.log(`Mailer: ${info.response}`);
  });
};

module.exports.sendEmailVerification =  (recipient, token) => {
  var mailOptions = {
    from: `${config.APP_NAME} <${config.MAIL_USER}>`, // sender address (who sends)
    to: recipient, // list of receivers (who receives)
    subject: `Activate your ${config.APP_NAME} account`, // Subject line
    text: `Thank you for using ${config.APP_NAME}. If you have not done so,
    please confirm you want to use this address for your ${config.APP_NAME}
    account. Once you verify, you can begin using ${config.APP_NAME}. Click
    the link below to verify your account.\n\n
    http://localhost:3000/verify/${recipient}/${encodeURIComponent(token)}`, // plaintext body
    html: `<h2>Verify your E-mail</h2>
    <p>Thank you for using ${config.APP_NAME}. If you have not done so,
    please confirm you want to use this address for your ${config.APP_NAME}
    account. Once you verify, you can begin using ${config.APP_NAME}<br/> <br/>
    <a href="http://localhost:3000/verify/${recipient}/${encodeURIComponent(token)}">
    Verify this email</a>` // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }

    console.log(`Mailer: ${info.response}`);
  });
};

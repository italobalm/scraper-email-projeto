require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");

// Criação do transportador de e-mail com base nas variáveis de ambiente
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar o e-mail com anexo
async function sendEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Scraper Bot" <${process.env.EMAIL_USER}>`,
      to: "italobalm@gmail.com", // <- Seu e-mail aqui
      subject: "Scraper enviado por Italo",
      text: "Segue em anexo o arquivo do scraper.",
      html: "<p>Segue em anexo o arquivo do scraper.</p>",
      attachments: [
        {
          filename: "scraper.js",
          path: path.join(__dirname, "../scraper/app.js"),
        },
      ],
    });

    console.log("✅ E-mail enviado com sucesso! ID:", info.messageId);
  } catch (error) {
    console.error("❌ Erro ao enviar o e-mail:", error);
  }
}

sendEmail();
const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Função para enviar dados para o Google Sheets
async function appendToGoogleSheet(data) {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SPREADSHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Page1!A1", // Ajuste o intervalo conforme necessário
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [data], // Cada array interno será uma linha
    },
  });
}

// Função para buscar dados do Google Sheets
async function getGoogleSheetData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SPREADSHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Page1!A1:D", // Ajuste o intervalo conforme necessário
  });

  return response.data.values || [];
}

app.get("/", (req, res) => {
  res.send("Servidor funcionando! Use as rotas /submit para enviar dados e /google-sheets-data para buscar dados.");
});

// Rota para receber dados do frontend
app.post("/submit", async (req, res) => {
  const { destinatario, assunto, mensagem, envio } = req.body;

  try {
    // Envia os dados para o Google Sheets
    await appendToGoogleSheet([destinatario, assunto, mensagem, envio || ""]);

    res.status(200).json({ message: "Dados enviados com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar solicitação:", error);
    res.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

// Rota para buscar dados do Google Sheets
app.get("/google-sheets-data", async (req, res) => {
  try {
    const data = await getGoogleSheetData();
    // Transformar dados em um formato mais amigável para o frontend
    const formattedData = data.map((row, index) => ({
      id: index.toString(),
      destinatario: row[0] || "",
      assunto: row[1] || "",
      mensagem: row[2] || "",
      status: row[3] || "",
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Erro ao buscar dados da planilha:", error);
    res.status(500).json({ error: "Erro ao buscar dados da planilha." });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

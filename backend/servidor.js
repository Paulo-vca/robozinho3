// Atualizando o backend para classificar mensagens por status
const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Validação de variáveis de ambiente
if (!process.env.GOOGLE_CREDENTIALS_PATH || !process.env.SPREADSHEET_ID) {
  throw new Error(
    "Verifique se as variáveis de ambiente GOOGLE_CREDENTIALS_PATH e SPREADSHEET_ID estão configuradas corretamente."
  );
}

// Função para buscar dados do Google Sheets
async function getGoogleSheetData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS_PATH, // Caminho para o arquivo de credenciais
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"], // Permissões apenas de leitura
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SPREADSHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Page1!A2:D", // Intervalo para buscar os dados
  });

  return response.data.values || [];
}

// Função para classificar mensagens por status
function classifyMessages(data) {
  const today = new Date();

  return data.map((row, index) => {
    const envioDate = row[3] ? new Date(row[3]) : null; // Converte a data de envio, se existir
    let status = "Não Enviado";

    if (envioDate) {
      if (envioDate < today) {
        status = "Enviado";
      } else {
        status = "Pendente";
      }
    }

    return {
      id: index.toString(), // ID único para cada linha
      destinatario: row[0] || "",
      assunto: row[1] || "",
      mensagem: row[2] || "",
      envio: row[3] || "",
      status,
    };
  });
}

// Rota para buscar dados do Google Sheets
app.get("/google-sheets-data", async (req, res) => {
  try {
    const data = await getGoogleSheetData();
    const formattedData = classifyMessages(data);

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Erro ao buscar dados da planilha:", error);
    res.status(500).json({ error: "Erro ao buscar dados da planilha." });
  }
});


app.get("/", (req, res) => {
  res.send(
    "Servidor funcionando! Use as rotas /submit para enviar dados e /google-sheets-data para buscar dados."
  );
});




// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://10.8.16.52:${PORT}`);
});


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
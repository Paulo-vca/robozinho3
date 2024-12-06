const { google } = require("googleapis");
const path = require("path");

// Caminho do arquivo de credenciais
const credentialsPath = path.join(__dirname, "credentials", "robozinho2-099fb0614bb4.json");

async function appendDataToSheet(data) {
  try {
    // Autenticação com o Google
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Criação do cliente Google Sheets
    const sheets = google.sheets({ version: "v4", auth });

    // ID da sua planilha (disponível na URL da planilha do Google)
    const spreadsheetId = "1auwQ5J6cBALsi0z0Pd8zBBzlPrGyXfDXOEbuoCXL51c";

    // Configuração dos dados a serem enviados
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Página1!A1", // Ajuste o nome da aba e o intervalo conforme necessário
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [data], // Cada array interno será uma linha
      },
    });

    console.log("Dados enviados com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar os dados para o Google Sheets:", error);
  }
}

module.exports = appendDataToSheet;

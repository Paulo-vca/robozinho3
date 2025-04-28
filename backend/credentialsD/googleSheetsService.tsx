// import { google } from "googleapis";
// import path from "path";

// const credentialsPath = path.resolve(__dirname, "robozinho2-099fb0614bb4.json");

// export async function appendDataToSheet(data: any[]) {
//   try {
//     // Configuração de autenticação com o Google
//     const auth = new google.auth.GoogleAuth({
//       keyFile: credentialsPath,
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });
//     console.log("Caminho do arquivo JSON:", credentialsPath);

//     // Criação do cliente Google Sheets
//     const sheets = google.sheets({ version: "v4", auth });

//     // ID da planilha
//     const spreadsheetId = "1auwQ5J6cBALsi0z0Pd8zBBzlPrGyXfDXOEbuoCXL51c";

//     // Configuração dos dados a serem enviados
//     const requestBody = {
//       values: [data], // Cada array interno será uma linha
//     };

//     await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range: "Page!A1", // Ajuste o nome da aba e o intervalo conforme necessário
//       valueInputOption: "USER_ENTERED",
//       requestBody, // Substituí `resource` por `requestBody`
//     });

//     console.log("Dados enviados com sucesso!");
//   } catch (error) {
//     console.error("Erro ao enviar os dados para o Google Sheets:", error);
//   }
// }

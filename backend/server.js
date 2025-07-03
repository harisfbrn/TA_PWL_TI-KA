// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Sentiment from 'sentiment';
import axios from 'axios';

const app = express();
const port = 3001;
const sentiment = new Sentiment();



// Ganti ini dengan token dari BotFather
const TELEGRAM_BOT_TOKEN = '7579780765:AAH8t7P9E0hi8BQMb4NaiAiddS1x8uUWZwM';
const TELEGRAM_API_URL = `https://api.telegram.org/bot7579780765:AAH8t7P9E0hi8BQMb4NaiAiddS1x8uUWZwM/sendMessage
`;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', (req, res) => {
  const { text } = req.body;
  const result = sentiment.analyze(text);

  let sentimentLabel = 'Netral';
  if (result.score > 0) sentimentLabel = 'Positif 😊';
  else if (result.score < 0) sentimentLabel = 'Negatif 😠';

  res.json({ sentiment: sentimentLabel });
});


// Webhook endpoint Telegram
app.post('/webhook', async (req, res) => {
  const message = req.body.message;

  // Jika tidak ada pesan, abaikan
  if (!message || !message.text) return res.sendStatus(200);

  const chatId = message.chat.id;
  const text = message.text;

  // Analisis sentimen
  const result = sentiment.analyze(text);
  let sentimentLabel = 'Netral';
  if (result.score > 0) sentimentLabel = 'Positif 😊';
  else if (result.score < 0) sentimentLabel = 'Negatif 😠';

  // Kirim balasan ke Telegram
  await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
    chat_id: chatId,
    text: `Sentimen pesan Anda: ${sentimentLabel}`,
  });

  res.sendStatus(200); // OK
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});

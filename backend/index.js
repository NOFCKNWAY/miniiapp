// const dotenv = require('dotenv');
// dotenv.config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const PORT = 3001;

const TELEGRAM_BOT_TOKEN = '7560747150:AAGpYpIUV1sW3BYbyoKOBsUhlYUtM422Jqk';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

app.use(express.json());

// Обработка CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Эндпоинт для проверки
app.get('/', (req, res) => {
  res.send('Backend работает!');
});

// Обработка вебхуков от Telegram
app.post('/webhook', async (req, res) => {
  const { message } = req.body;
  if (message && message.text === '/start') {
    try {
      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: message.chat.id,
          text: 'Добро пожаловать! Нажмите кнопку ниже, чтобы начать игру:',
          reply_markup: {
            inline_keyboard: [[{
              text: 'Играть',
              web_app: { url: 'http://localhost:3000' }
            }]]
          }
        })
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  res.sendStatus(200);
});

// Настройка вебхука
async function setupWebhook() {
  try {
    const response = await fetch(`${TELEGRAM_API}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://your-domain.com/webhook', // Замените на ваш домен
        allowed_updates: ['message']
      })
    });
    const data = await response.json();
    console.log('Webhook setup response:', data);
  } catch (error) {
    console.error('Error setting up webhook:', error);
  }
}

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Backend запущен на порту ${PORT}`);
  // setupWebhook(); // Раскомментируйте после настройки домена
}); 
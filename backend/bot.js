require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Токен бота
const token = '7560747150:AAGpYpIUV1sW3BYbyoKOBsUhlYUtM422Jqk';
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    // Создаем inline клавиатуру с кнопкой для запуска Mini App
    const keyboard = {
        inline_keyboard: [[
            {
                text: 'Играть',
                web_app: { url: 'https://t.me/your_bot_username/your_app_name' } // Замените на ваш app_id
            }
        ]]
    };

    bot.sendMessage(chatId, 'Играйте в игру!', {
        reply_markup: keyboard
    });
});

// Обработчик нажатия на кнопку "Играть"
bot.on('message', (msg) => {
    if (msg.text === 'Играть') {
        bot.sendMessage(msg.chat.id, 'Запустите приложение по адресу: http://localhost:3000');
    }
});

console.log('Telegram bot is running...'); 
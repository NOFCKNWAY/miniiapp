# Telegram Mini App

Это Telegram Mini App с ботом для запуска игры.

## Установка

1. Клонируйте репозиторий:
```bash
git clone [url-вашего-репозитория]
cd miniapp
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите фронтенд:
```bash
npm run frontend
```

4. Запустите бэкенд:
```bash
npm run backend
```

5. Запустите бота:
```bash
npm run bot
```

## Структура проекта

- `/frontend` - React приложение
- `/backend` - Node.js сервер
- `bot.js` - Telegram бот

## Настройка

1. Создайте бота через @BotFather в Telegram
2. Получите токен бота
3. Замените токен в файле `backend/bot.js`
4. Зарегистрируйте Mini App через @BotFather
5. Обновите URL в коде бота после деплоя

## Скрипты

- `npm run frontend` - запуск фронтенда
- `npm run backend` - запуск бэкенда
- `npm run bot` - запуск бота
- `npm run dev` - запуск всего проекта 
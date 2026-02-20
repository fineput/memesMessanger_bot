# Використовуємо офіційний образ Node.js
FROM node:20-alpine

# Створюємо робочу директорію
WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm install --production

# Копіюємо весь код проекту
COPY . .

# Запускаємо бота
CMD ["node", "src/bot.js"]
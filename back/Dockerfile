# Используем базовый образ с Node.js
FROM node:14

# Устанавливаем зависимости
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Определяем команду для запуска приложения
CMD ["npm", "start"]

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const WebSocket = require('ws'); // Импортируем пакет WebSocket
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const Galaxy = require("./models/Galaxy");
dotenv.config();
const schema = buildSchema(`
    type Query {
        galaxies: [Galaxy]
    }
    type Galaxy {
        name: String
        description: String
        distance: Int
        photo: String
    }
`);
const root = {
    galaxies: async () => {
        try {
            const galaxies = await Galaxy.find(); // Выполняем запрос к базе данных для получения данных о галактиках
            return galaxies; // Возвращаем полученные данные
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch galaxies');
        }
    }
};
const app = express();

connectDB();

app.use(express.json({extended: false}));
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Включить интерактивный графический интерфейс GraphiQL для тестирования API
}));
app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use('/api/galaxies', require('./routes/galaxyRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Создаем WebSocket сервер на основе HTTP-сервера Express
const wss = new WebSocket.Server({server});

// Обработчик нового соединения WebSocket
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    // Обработчик входящего сообщения от клиента WebSocket
    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Отправляем сообщение обратно клиенту WebSocket
        ws.send('Message received: ' + message);
    });

    // Обработчик закрытия соединения WebSocket
    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});





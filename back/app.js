const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Galaxy = require("./models/Galaxy");
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
            const galaxies = await Galaxy.find();
            return galaxies;
        } catch (err) {
            throw new Error('Failed to fetch galaxies');
        }
    }
};

// Маршрут GraphQL
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use(async (err, req, res, next) => {
    try {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    } catch (error) {
        next(error);
    }
});



import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL is amazing');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))
app.listen(8484, () => console.log('Running server on 8080'));
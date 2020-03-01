const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const cors = require('cors');

// allow cross-origin requests
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(express.static('build'))
app.use('*', express.static('build'))

app.listen(3000, () => console.log('listening for requests on port 3000'))

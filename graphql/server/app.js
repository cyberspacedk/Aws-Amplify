const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();


const schema = require('./schema/schema');

const app = express();

mongoose.connect(process.env.DB_URI);
mongoose.connection.once('open', () => {
  console.log('SUCCESS CONNECTION');
})

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}));

app.listen(process.env.PORT, () => {
  console.log('Server start at', process.env.PORT)
});
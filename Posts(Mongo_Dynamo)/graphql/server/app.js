const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();


const schema = require('./schema/schema');

const app = express();

mongoose.connect(process.env.DB_URI);
mongoose.connection.once('open', () => {
  console.log('SUCCESS CONNECTION');
})

app.use(cors());
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}));

app.listen(process.env.PORT || 7000, () => {
  console.log('Server start at', process.env.PORT)
});
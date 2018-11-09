const express = require('express');
const morgan = require('morgan');
const app = express();
const { db } = require('./models');
const models = require('./models');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname, +'/stylesheets'));
app.use(morgan('dev'));

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = 3000;

const init = async () => {
  // await models.User.sync();
  // await models.Page.sync();
  await models.db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Server Ready on ${PORT}`);
  });
};

init();

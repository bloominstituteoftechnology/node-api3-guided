const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);
// server.use(lockout);
server.use(addName);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function logger(req, res, next) {
  console.log(req.method);
  next();
}

function lockout(req, res, next) {
  const sec = new Date().getSeconds();

  if (sec % 3 === 0) {
    res.status(403).json({message: 'api is down'});
  } else {
    next();
  }
}

function addName(req, res, next) {
  if (!req.name) {req.name = 'Bob'}
}

server.use((error, req, res, next) => {
  res.status(error.status).json(error);
})

module.exports = server;
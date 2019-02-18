const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
// server.use((req, res) => {
//   res.status(404).send("Ain't nobody got time for that!");
// });
server.use(teamNamer);
// server.use(moodyGateKeeper);

server.use('/api/hubs', restricted, only('frodo'), hubsRouter);

// server.get('/', (req, res, next) => {
//   res.send(`
//     <h2>Lambda Hubs API</h2>
//     <p>Welcome ${req.team}, to the Lambda Hubs API</p>
//     `);
// });

server.get('/', restricted, async (req, res, next) => {
  res.send(`
  <h2>Lambda Hubs API</h2>
  <p>Welcome ${req.team}, to the Lambda Hubs API</p>
  `);
});

server.use(errorHandler);

// implementation

function teamNamer(req, res, next) {
  req.team = 'Lambda Students';

  next();
}

function moodyGateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).json({ you: 'shall not pass!' });
  } else {
    next();
  }
}

function restricted(req, res, next) {
  const password = req.headers.authorization;

  if (password === 'mellon') {
    next();
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

function only(name) {
  return function(req, res, next) {
    const personName = req.headers.name || '';

    if (personName.toLowerCase() === name.toLowerCase()) {
      next();
    } else {
      res.status(401).json({ message: 'You have no access to this resource' });
    }
  };
}

function errorHandler(error, req, res, next) {
  res.status(400).json({ message: 'Bad Panda!', error });
}

module.exports = server;

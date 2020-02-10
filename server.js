const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');

const helmet = require('helmet'); // npm i helmet

const morgan = require('morgan'); // npm i morgan

const server = express();



function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`);

  next();
}

function echo(req, res, next) {
  console.log(req.body);

  next();
}

function gatekeeper(req, res, next) {
  if(req.headers.password === 'mellon') {
    next();
  } else {
    res.status(401).json({you: "wrong password!!"});
  }
    
}




// this is a global middleware (cares about all request)
server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use(logger);
server.use(echo);
server.use(gatekeeper);



// cares about all requests beginningwith /api/hubs
server.use('/api/hubs', hubsRouter);


server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});
server.use(greeter);
// 3 amigos
function greeter(req, res, next) {
  res.status(200).json({ hi: 'there'})
}

module.exports = server;

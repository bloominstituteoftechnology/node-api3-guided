const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors')

server.use(express.json());
server.use(cors())
server.use(morgan('tiny'))

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

module.exports = server;



function logger (req,res,next){
  console.log(`[${req.method}] ${req.url}`)
  next()
}
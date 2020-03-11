const express = require('express'); // importing a CommonJS module
const morgan = require('morgan') // importing 3rd party middleware || 1: npm i helmet, 2- require
const helmet = require('helmet') //importing 3rd party middleware || 1: npm i helmet, 2- require
const logger = require('./middleware/customLogger')
const notFound = require('./middleware/notFound')
const hubsRouter = require('./hubs/hubs-router.js');
const server = express();

//Global Middleware (Applies to Every Request coming into the Server)
server.use(helmet()) // Third Party, need to be NPM INSTALLED || 3:
server.use(logger)
// server.use(morgan('dev')) // Third Party, need to be NPM INSTALLED || 3:
server.use(express.json()); //Example 1: Built-In Middleware || No Need to NPM INSTALL
server.use('/api/hubs', hubsRouter);
//-------------------------------------------------------------------------------------------------
//GET: "/"
server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
  console.log('req.name is:', req.name)

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${nameInsert}, to the Lambda Hubs API</p>
    `);
});
//-------------------------------------------------------------------------------------------------
// Custom Middleware if Endpoint's Not Found
server.use(notFound)
//-------------------------------------------------------------------------------------------------
module.exports = server;

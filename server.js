const express = require('express'); // importing a CommonJS module
//THIRD PARTY MIDDLEWARE---------------------------------------------------------------------------
const morgan = require('morgan') // importing 3rd party middleware || 1: npm i helmet, 2- require
const helmet = require('helmet') //importing 3rd party middleware || 1: npm i helmet, 2- require
//CUSTOM MIDDLEWARE---------------------------------------------------------------------------------
const statusLogger = require('./middleware/statusLogger')
const notFound = require('./middleware/notFound')
const dateLogger = require('./middleware/dateLogger')
const nameLogger = require('./middleware/nameLogger')
//--------------------------------------------------------------------------------------------------
const hubsRouter = require('./hubs/hubs-router.js');
const server = express();

//Global Middleware (Applies to Every Request coming into the Server)
server.use(helmet()) // Third Party, need to be NPM INSTALLED || 3:
server.use(statusLogger) // Custom Middleware, We created in "Middleware" Folder
server.use(dateLogger) // Custom Middleware, We created in "Middleware" Folder
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
server.use(notFound) // Custom Middleware, We created in "Middleware" Folder
//-------------------------------------------------------------------------------------------------
module.exports = server;

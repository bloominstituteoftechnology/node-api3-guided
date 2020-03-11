const server = require('./server.js');

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})
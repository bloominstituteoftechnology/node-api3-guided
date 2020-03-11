//-------------------------------------------------------------------------------------------------

//CUSTOM Middleware
module.exports = function customLogger(req,res, next){
    //This Middleware will log information about the Request to the Console
    // GET to "/"
    const method = req.method;
    const endPoint = req.originalUrl;
  
    console.log(`${method}: "${endPoint}"`)
    next() //Moves the Request to the NEXT Middleware!
  }
  
//-------------------------------------------------------------------------------------------------
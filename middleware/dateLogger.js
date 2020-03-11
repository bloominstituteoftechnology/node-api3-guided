//Custom Middleware
module.exports = function dateLogger(req,res,next){
    console.log(new Date().toISOString());
    next();
  }
  
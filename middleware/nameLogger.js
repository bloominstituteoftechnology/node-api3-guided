//Custom Middleware
module.exports = function nameLogger(req,res,next){
    req.name = "WEB27"
    next();
}
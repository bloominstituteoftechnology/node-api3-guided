//Custom Middleware
module.exports = function nameLogger(req,res,next){
    const newName = req.name ? req.name : 'WEB27';
    req.name = newName;
    next();
}
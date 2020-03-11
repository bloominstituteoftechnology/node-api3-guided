//Custom Middleware
module.exports = function nameLogger(req,res,next){
    // newName = is there a name ? if so: use that name! otherwise, use 'WEB27'
    const newName = req.name ? req.name : 'WEB27';
    req.name = newName;
    next();
}
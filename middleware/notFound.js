//CUSTOM Middleware
module.exports = function(req,res,next){
    res
    .status(404)
    .json({message: "Oops! Could not find what you're looking for!"})
    //If the endpoint doesn't exist, throw this error.
    next();
}
module.exports = prop => (req, res, next) =>
req.body[prop]
? next()
: res.status(400).json({ errorMessage: `required ${prop}` });


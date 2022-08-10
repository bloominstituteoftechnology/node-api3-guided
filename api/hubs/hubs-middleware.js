function validateHub(req, res, next) {
  if(typeof req.body.name !== 'string') {
    res.status(400).json({ message: 'name must be a string' });
  } else if(req.body.trim() !== '') {
    res.status(400).json({ message: 'name must not be empty' });
  } else {
    req.newHub = { name: req.body.trim() };
    next();
  }
}

module.exports = {
    validateHub,
};
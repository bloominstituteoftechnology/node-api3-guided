function validateHub(req, res, next) {
  if(typeof req.body.name !== 'string') {
    res.status(400).json({ message: 'name must be a string' });
    return;
  }

  let { name } = req.body;

  if(name.trim() !== '') {
    res.status(400).json({ message: 'name must not be empty' });
    return;
  }

  req.newHub = { name: name.trim() };

  next();
}

module.exports = {
    validateHub,
};
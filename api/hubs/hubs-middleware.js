function sayHi(req, res, next) {
  // 3 POSSIBLE OUTCOMES

  // 1- we allow the req to proceed, call next without args
  // 2- we respond to the client as usual
  // 3- we toss some error, call next with an argument
  console.log(`Hello from the hubs router!`);
  req.cohort = 'Web 48';
  next(); // outcome 1
}

function greetCohort(req, res, next) {
  console.log(`${req.cohort} is the BEST!`);
  next(); // outcome 1
}

function maybeShortCircuit(req, res, next) {
  const cointoss = Math.floor(Math.random() * 2);
  if (cointoss === 1) {
    console.log('ok you can proceed');
    next();
  } else {
    // outcome 2: shoot back response
    next({ message: 'you shall not pass' });
  }
}

function errorHandling(err, req, res, next) { // eslint-disable-line
  res.status(err.status || 500).json({
    message: `Horror in the router: ${err.message}`,
    stack: err.stack,
  });
}

function checkId(req, res, next) {
  console.log(`checkId middleware working!!!`);
  next();
}

module.exports = {
  sayHi,
  greetCohort,
  maybeShortCircuit,
  errorHandling,
  checkId,
};

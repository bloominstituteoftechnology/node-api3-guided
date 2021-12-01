const Hub = require('./hubs-model');

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

async function checkId(req, res, next) {
  // pull the hub from the db
  // if it comes back, we'll tack it to the req
  // object and continue...
  // if not, we'll send a 404 to the err handling
  try {
    const hub = await Hub.findById(req.params.id);
    if (hub) {
      req.hub = hub; // saves other middlewarws a db trip
      next();
    } else {
      next({ status: 404, message: 'not found!' });
    }
  } catch (error) {
    next(error);
  }
}

function checkHubPayload(req, res, next) {
  // this is you!
  // if req.body.name legit proceed
  // otherwise send clinet packeing with 422
  if (!req.body.name || !req.body.name.trim()) {
    next({ status: 422, message: 'I need a name MAN!' });
  } else {
    next();
  }
}

module.exports = {
  sayHi,
  greetCohort,
  maybeShortCircuit,
  errorHandling,
  checkId,
  checkHubPayload,
};

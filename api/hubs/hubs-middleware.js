function sayHi(req, res, next) {
  // 3 POSSIBLE OUTCOMES

  // 1- we allow the req to proceed
  // 2- we respond to the client
  // 3- we toss some error (to an error handling middl)
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
    res.status(500).json({
      message: 'this request was short circuited!'
    });
  }
}

module.exports = {
  sayHi,
  greetCohort,
  maybeShortCircuit,
};

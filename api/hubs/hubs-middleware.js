function sayHi(req, res, next) {
  // 3 POSSIBLE OUTCOMES

  // 1- we allow the req to proceed
  // 2- we respond to the client
  // 3- we toss some error (to an error handling middl)
  console.log(`Hello from the hubs router!`);
  req.cohort = 'Web 48';
  next();
}

function greetCohort(req, res, next) {
  
}

module.exports = {
  sayHi,
};

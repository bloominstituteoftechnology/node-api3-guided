# Web API III Guided Project

Guided project for **Web API III** module.

In this project we will learn how to create a very simple Web API using `Node.js` and `Express`, and cover the basics of `server-side routing` and using global `middleware`.

The code for the guided project will be written in a single file for simplicity. We'll see ways to structure an API to make it more maintainable in upcoming lectures.

## Prerequisites

- [Postman](https://www.getpostman.com/downloads/) installed.

## Starter Code

The [starter code](https://github.com/LambdaSchool/webapi-hubs) for this project is configured to run the server by typing `yarn server` or `npm run server`. The server will restart automatically on changes.

Data for the API will be stored in memory using an array.

## Introduce Middleware

Use the content on Training Kit to introduce the `middleware`.

Explain there are three types and they have seen an example of _build-in middleware_ when they used `express.json()`.

## Use Third Party Middleware

1. Run the server and visit the `/` endpoint using `Postman`.
1. Show the headers. There are 6 headers, one of them is `X-Powered-By: Express`. Explain how this is a security problem.
1. Install `helmet` npm module.
1. Require `helmet` inside `server.js`: `const helmet = require('helmet');`
1. Use the `helmet` middleware: `server.use(helmet())`
1. Send another request using `Postman`. We get security headers added and the `X-Powered-By: Express` is gone.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

### You Do (estimated time 5 mins)

Ask students to install and use a `morgan`. Hint them to follow a link to `morgan` on Training Kit and read the documentation on how to use it.

Solution.

```js
const morgan = require('morgan');
const server = express();
server.use(morgan('dev')); // one of the options for the display format is 'dev'
```

Make a request to any endpoint on the server and show the log that `morgan` displays on the terminal/console window.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

Next, we'll learn how to create the other type of middleware: `custom middleware`.

## Write Custom Middleware

1. Explain how _custom middleware_ works.
2. Add this middleware before the route handlers:

```js
server.use((req, res, next) => {
  res.status(404).send("Ain't nobody got time for that");
});
```

3. Explain that middleware can be used _globally_ and _locally_, in this example we're using it globally, so all requests will get rejected with a `404` code.
4. Visit any endpoint to verify the middleware is working.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

A middleware that blocks all requests is not useful, let's write a piece of middleware that adds information to the `request` object.

## Use Custom Middleware to Modify the Request Object

1. Comment out the middleware that returns `404` for all requests.
1. Modify the `GET /` endpoint:

```js
server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team}, to the Lambda Hubs API</p>
    `);
});
```

2. Make a request to the server and show that we get `undefined` as the value for `req.team`.
3. Write custom middleware to fix that:

```js
function teamNamer(req, res, next) {
  // we can add properties to the request and response objects
  req.team = 'Lambda Students';

  // if we don't call next the request will hang and clients will time out.
  next(); // calling next continues to the next middleware/route handler
}
```

4. `Use` the middleware before the route handlers: `server.use(teamNamer)`.
5. Make a new request. The value was set by the _middleware_.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

### You Do (estimated 5 min to complete)

Ask students to write and _use_ custom middleware that returns status code `403` and the message 'you shall not pass!' when the seconds on the clock are multiples of 3 and call `next()` for all other times.

One possible solution:

```js
server.use(moodyGateKeeper);

function moodyGateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).json({ you: 'shall not pass!' });
  } else {
    next();
  }
}
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

What if we want to add middleware that affects a set of endpoints, but not others?

## Use Middleware Locally

1. Make a GET request to `/api/hubs` to verify it works.
2. Write middleware that reads a password from the `authentication` header, and if it is 'mellon' the request can continue, otherwise the API responds with a `401` status code and a message.

```js
function restricted(req, res, next) {
  const password = req.headers.authorization;

  if (password === 'mellon') {
    next();
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
```

3. Use the `middleware` locally for the `/api/hubs` endpoints: `server.use('/api/hubs', restricted, hubsRouter);`.
4. Make a GET request to `/api/hubs` to verify it returns a `401` status code.
5. Show how to add the `Authentication` header using `Postman`.
6. Test the endpoint with correct and incorrect passwords.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

### You Do (estimated 10 minutes to complete)

Ask students to write a function called `only`. It should accept a `name` as it's only argument and return `middleware` that return a `403` status code if `req.headers.name` is different from the `name` specified.

It is meant to be use like this: `server.use('/api/hubs', restricted, only('frodo'), hubsRouter);`. For this example if `req.headers.name` is not _"frodo"_ the request should be denied.

One possible solution:

```js
function only(name) {
  return function(req, res, next) {
    const personName = req.headers.name || ''; // just in case there is no name header provided

    if (personName.toLowerCase() === name.toLowerCase()) {
      next();
    } else {
      res.status(401).json({ message: 'You have no access to this resource' });
    }
  };
}
```

Note that we can use more than one local `middleware`. We are using `restricted` and `only()` so we need to add both headers.

Test without with different combinations of _authorization_ and _name_ headers.

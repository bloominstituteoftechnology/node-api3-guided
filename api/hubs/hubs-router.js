const express = require('express');
const {
  sayHi,
  greetCohort,
  maybeShortCircuit,
  errorHandling,
  checkId,
  checkHubPayload,
} = require('./hubs-middleware');
const Hubs = require('./hubs-model.js');
const Messages = require('../messages/messages-model.js');

const router = express.Router();

router.use(sayHi); // plugging the middl. Order matters!
router.use(greetCohort);

router.get(
  '/',
  [maybeShortCircuit, maybeShortCircuit],
  (req, res, next) => {
    console.log('truly!', req.cohort);
    Hubs.find(req.query)
      .then(hubs => {
        res.status(200).json(hubs);
      })
      .catch(error => {
        next(error);
      });
  });

router.get('/:id', checkId, (req, res, next) => {
  res.status(200).json(req.hub);
});

router.post('/', checkHubPayload, (req, res, next) => {
  if (!req.body.name) {
    next({ status: 411, message: 'req.body sucks' });
  } else {
    Hubs.add(req.body)
      .then(hub => {
        res.status(201).json(hub);
      })
      .catch(error => {
        next(error);
      });
  }
});

router.delete('/:id', checkId, (req, res, next) => {
  Hubs.remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: 'hub destroyed!!' });
    })
    .catch(error => {
      next(error);
    });
});

router.put('/:id', checkHubPayload, checkId, (req, res, next) => {
  Hubs.update(req.params.id, req.body)
    .then(hub => {
      res.json(hub);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/messages', checkId, (req, res, next) => {
  Hubs.findHubMessages(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/messages', checkId, (req, res, next) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };

  Messages.add(messageInfo)
    .then(message => {
      res.status(210).json(message);
    })
    .catch(next);
});

// this would trap errors in the endpoints above it
router.use(errorHandling);

module.exports = router;

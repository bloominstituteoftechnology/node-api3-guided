const express = require('express');
const {
  sayHi,
  greetCohort,
  maybeShortCircuit,
  errorHandling,
  checkId,
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

router.post('/', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.put('/:id', (req, res, next) => {
  Hubs.update(req.params.id, req.body)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/messages', (req, res, next) => {
  Hubs.findHubMessages(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/messages', (req, res, next) => {
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

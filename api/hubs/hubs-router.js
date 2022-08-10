const express = require('express');

const Hubs = require('./hubs-model.js');
const Messages = require('../messages/messages-model.js');

const { validateHub, validateHubIsUnique, validateHubId } = require('./hubs-middleware');


const router = express.Router();



// function jubjub(req, res, next) {
//   // console.log(req.method, req.originalUrl);
//   req.jubjub = 'jaws that bite and teeth that';
//   next();
// }

// router.use(jubjub);

function moodyGatekeeper(req, res, next) {
  if(Math.random() > 0.5) {
    res.status(403).json({ message: 'you are forbidden' });
  } else {
    next();
  }
}

router.get('/', moodyGatekeeper, (req, res) => {

  console.log(req.jabberwocky);
  console.log(req.jubjub);

  Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
});

router.get('/:id', validateHubId, (req, res) => {
  res.json(req.existingHub);
});

router.post('/', validateHub, validateHubIsUnique, (req, res) => {
  Hubs.add(req.newHub)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
});

router.delete('/:id', validateHubId, (req, res) => {
  Hubs.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.existingHub);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
});

router.put('/:id', validateHub, validateHubId, (req, res) => {
  Hubs.update(req.params.id, req.newHub)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
});

router.get('/:id/messages/', (req, res) => {
  Hubs.findHubMessages(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting the messages for the hub',
      });
    });
});

router.post('/:id/messages', (req, res) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };

  Messages.add(messageInfo)
    .then(message => {
      res.status(210).json(message);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error adding message to the hub',
      });
    });
});

module.exports = router;

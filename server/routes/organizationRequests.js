const router = require('express').Router();
module.exports = router;

const { OrganizationRequest } = require('../db').models;
const { io, webAppSockets, mobileSockets } = require('../sockets');

router.get('/', (req, res, next) => {
  OrganizationRequest.findAll()
    .then(organizationRequests => res.send(organizationRequests))
    .catch(next);
});

router.post('/', (req, res, next) => {
  OrganizationRequest.create(req.body)
    .then(organizationRequest => {
      const socketId = webAppSockets[organizationRequest.organizationId];
      io.to(socketId).emit('newOrganizationRequest', organizationRequest);
      res.send(organizationRequest);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  OrganizationRequest.findById(req.params.id)
    .then(organizationRequest => {
      Object.assign(organizationRequest, req.body)
      return organizationRequest.save()
    })
    .then(organizationRequest => {
      const socketId = mobileSockets[organizationRequest.userId];
      io.to(socketId).emit('updatedOrganizationRequest', organizationRequest);
      res.send(organizationRequest)
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  OrganizationRequest.findById(req.params.id)
    .then(organizationRequest => organizationRequest.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

const router = require('express').Router();
module.exports = router;

const { UserOrganization } = require('../db').models;

router.get('/', (req, res, next) => {
  UserOrganization.findAll()
    .then(userorganizations=> res.send(userorganizations))
    .catch(next);
});

router.post('/', (req, res, next) => {
  UserOrganization.create(req.body)
    .then(userorganization => res.send(userorganization))
    .catch(next);
});
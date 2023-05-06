const routes = require('express').Router();
const controller = require('../controllers/contacts');

routes.get('/', controller.getAll);
routes.get('/:id', controller.get);

routes.post('/:id', controller.createOne);
routes.post('/:id', controller.createMany);

routes.put('/:id', controller.update);

routes.delete('/:id', controller.deleteOne);
routes.delete('/:id', controller.deleteMany);


module.exports = routes;
const routes = require('express').Router();
const controller = require('../controllers/contacts');

routes.get('/', controller.getAll);
routes.get('/:id', controller.get);

routes.post('/createOne', controller.createOne);
routes.post('/createMany', controller.createMany);

routes.put('/:id', controller.update);

routes.delete('/deleteOne/:id', controller.deleteOne);
routes.delete('/deleteMany', controller.deleteMany);


module.exports = routes;
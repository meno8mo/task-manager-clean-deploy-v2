const router = require('express').Router();

module.exports = (controller) => {
  router.post('/', controller.create);
  router.get('/', controller.getAll);
  router.get('/search', controller.search);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);
  return router;
};

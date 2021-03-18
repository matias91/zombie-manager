const Joi = require('joi');

const Handlers = require('../handlers/zombie.handler').handlers;

const API_BASE_PATH = '/api';
const routes = [];

/**
 * Add new zombie
 *
 * @method POST /api/zombie/add
 */
routes.push({
  method: 'POST',
  path: `${API_BASE_PATH}/zombie/add`,
  handler: Handlers.addZombie,
  options: {
    auth: false,
    description: 'Add new zombie',
    notes: 'Creates a new zombie',
    tags: ['api', 'zombie', 'add'],
    validate: {
      payload: {
        location: Joi.string().required(),
        name: Joi.string()
      }
    }
  }
});

/**
 * Update zombie data.
 *
 * @method PATCH /api/zombie/{id}
 *
 * @param {string} payload.data - The data to be updated.
 */
routes.push({
  method: 'PATCH',
  path: `${API_BASE_PATH}/zombie/{id}`,
  handler: Handlers.updateZombie,
  options: {
    description: 'Update zombie data',
    notes: 'Update zombie data',
    tags: ['api', 'zombie', 'info', 'update']
  }
});

/**
 * Returns the zombie list
 *
 * @method GET /api/zombie
 */
routes.push({
  method: 'GET',
  path: `${API_BASE_PATH}/zombie`,
  handler: Handlers.getZombieList,
  options: {
    auth: false,
    description: 'Returns the zombie list',
    notes: 'Returns the zombie list',
    tags: ['api', 'zombie', 'get', 'all'],
    validate: {
      query: {
        limit: Joi.number().integer(),
        offset: Joi.number().integer(),
        filter: Joi.object(),
        sort: Joi.object()
      }
    }
  }
});

/**
 * Returns the zombie summary
 *
 * @method GET /api/zombie/summary
 */
routes.push({
  method: 'GET',
  path: `${API_BASE_PATH}/zombie/summary`,
  handler: Handlers.getZombieSummary,
  options: {
    auth: false,
    description: 'Returns the zombie summary',
    notes: 'Returns the zombie summary',
    tags: ['api', 'zombie', 'get', 'summary']
  }
});

/**
 * Removs a zombie
 *
 * @method GET /api/zombie/remove/{id}
 */
routes.push({
  method: 'DELETE',
  path: `${API_BASE_PATH}/zombie/remove/{id}`,
  handler: Handlers.removeZombie,
  options: {
    auth: false,
    description: 'Remove a zombie',
    notes: 'Remove a zombie',
    tags: ['api', 'zombie', 'remove']
  }
});

module.exports = routes;

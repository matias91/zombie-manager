// @Vendors
const Boom = require('boom');

// @Models
const ZombieModel = require('../models/zombie.model');

// @Services
const AuditLogService = require('../services/log.service');

const Handlers = {};
const Lib = {};

/**
 * Add new zombie
 * @param {*} req
 * @param {*} reply
 */
Handlers.addZombie = async (req) => {
  try {
    const { location, name } = req.payload;

    const newZombie = await ZombieModel.create({ location, name });

    newZombie.id = newZombie._id;
    newZombie.save();

    AuditLogService.log('Info', 'Zombie/Create - Zombie Created', newZombie._id);

    return newZombie;
  } catch (error) {
    console.log(error);
    return Boom.internal('Something when wrong while trying to add a new zombie');
  }
};

/**
 * Update zombie data.
 *
 * @param {string} payload.data  - The info data to patch.
 */
Handlers.updateZombie = async (req) => {
  const data = req.payload;
  const { id } = req.params;

  const zombie = await ZombieModel.findByIdAndUpdate(id, data);

  AuditLogService.log('Info', 'Zombie/Info - Updated', id);

  return zombie;
};

/**
 * Returns the zombie list
 * @param {*} req
 * @param {*} reply
 */
Handlers.getZombieList = async (req) => {
  try {
    const { filter, limit, offset, sort } = req.query;
    const query = {};

    if (filter) {
      const keys = Object.keys(filter);

      keys.forEach((key) => {
        if (key === '_id') {
          query[key] = filter[key];
        } else {
          query[key] = { $regex: filter[key], $options: 'i' };
        }
      });
    }

    const zombieList = await ZombieModel.findAll(query, { limit, offset, sort });

    AuditLogService.log('Info', 'Zombie - GET all');

    const zombieListLength = await ZombieModel.count(query);

    return {
      data: zombieList,
      zombieListLength,
      totalPages: Math.ceil(zombieListLength / limit)
    };
  } catch (error) {
    console.log(error);
    return Boom.internal('Something when wrong while trying to fetch the zombie list');
  }
};

/**
 * Returns the zombie summary
 * @param {*} req
 * @param {*} reply
 */
Handlers.getZombieSummary = async (req) => {
  try {
    const hospitalAmount = await ZombieModel.count({ location: 'hospital' });
    const warehouseAmount = await ZombieModel.count({ location: 'warehouse' });
    const schoolAmount = await ZombieModel.count({ location: 'school' });

    AuditLogService.log('Info', 'Zombie - GET summary');

    return {
      hospitalAmount,
      warehouseAmount,
      schoolAmount
    };
  } catch (error) {
    console.log(error);
    return Boom.internal('Something when wrong while trying to fetch the zombie summary');
  }
};

/**
 * Remove a zombie
 * @param {*} req
 * @param {*} reply
 */
Handlers.removeZombie = async (req) => {
  try {
    const { id } = req.params;
    const removeResult = await ZombieModel.remove({ _id: id });

    AuditLogService.log('Info', 'Zombie - DELETE one');

    return removeResult;
  } catch (error) {
    console.log(error);
    return Boom.internal('Something when wrong while trying to remove a zombie');
  }
};

module.exports = {
  handlers: Handlers,
  lib: Lib
};

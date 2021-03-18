// @ThirdParty
const sanitize = require('mongo-sanitize');
// @Schemas
const Zombie = require('../schemas/zombie.schema');

class ZombieModel {
  /**
   * Updates the zombie matching the criteria with the given data.
   *
   * @param {ObjectId} id
   * @param {Object} data
   * @param {Function} next
   */
  findByIdAndUpdate(id, data) {
    const cleanedId = sanitize(id);
    const cleanedData = sanitize(data);
    return Zombie.findByIdAndUpdate(cleanedId, cleanedData, { new: true });
  }

  /**
   * Updates the zombie matching the criteria with the given data.
   *
   * @param {ObjectId} id
   * @param {Object} data
   * @param {Function} next
   */
  findAndUpdate(query, data) {
    return Zombie.updateMany(query, { $set: { ...data } }, { new: true });
  }

  /**
   * Returns the zombie matching the criteria or creates it if not found.
   *
   * @param {Object} query
   * @param {Function} next
   */
  async create(data) {
    const cleanedData = sanitize(data);
    const zombie = new Zombie(cleanedData);

    await zombie.save();
    return zombie;
  }

  /**
   * Retrieves the zombie matching the criteria.
   *
   * @param {Object} query
   * @param {Function} next
   */
  findOne(query) {
    const cleanedQuery = sanitize(query);
    return Zombie.findOne(cleanedQuery);
  }

  remove(query) {
    return Zombie.deleteOne(query);
  }

  /**
   * Retrieves all the zombie on the data base.
   *
   */
  findAll(query = {}, { limit = 10, offset = 0, paginate = true, sortEnabled = false, sort = {}, clean = true } = {}) {
    const finalQuery = clean ? sanitize(query) : query;
    if (!paginate) {
      if (!sortEnabled) {
        return Zombie.find(finalQuery);
      }

      return Zombie.find(finalQuery).limit(limit).sort(sort);
    }

    return Zombie
      .find(finalQuery)
      .sort(sort)
      .limit(limit)
      .skip(offset);
  }

  /**
   * Retrieves all the zombie on the data base.
   *
   */
  findAllRaw(query = {}, { limit = 10, offset = 0 } = {}, { paginate = true } = {}) {
    if (paginate) {
      return Zombie
        .find(query)
        .limit(limit)
        .skip(offset);
    }

    return Zombie.find(query);
  }

  /**
   * Retrieves all the deposits on the data base.
   *
   * @param {Function} next
   */
  count(query = {}) {
    const cleanQuery = sanitize(query);
    return Zombie.count(cleanQuery);
  }
}

module.exports = new ZombieModel();

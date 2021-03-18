// @Vendors
const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');
const _ = require('lodash');

const ZombieSchema = mongoose.Schema(
  {
    name: String,
    location: String,
    id: Number
  },
  {
    timestamps: true
  }
);

/**
 * Instance method to expose to the UI only the public fields.
 */
ZombieSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return _.omit(obj, ['__v']);
};

ZombieSchema.plugin(autoIncrement, {
  model: 'Zombie',
  startAt: 1
});

module.exports = mongoose.model('Zombie', ZombieSchema);

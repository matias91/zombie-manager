// @Vendors
const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');

const AuditLogSchema = mongoose.Schema({
  author: String,
  message: String,
  severity: String
},
  {
    timestamps: true
  });

AuditLogSchema.plugin(autoIncrement, {
  model: 'AuditLog',
  startAt: 1
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);

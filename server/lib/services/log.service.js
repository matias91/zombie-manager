// @Schemas
const moment = require('moment');
const AuditLog = require('../schemas/audit-logs.schema');

class AuditLogService {
  /**
   * AuditLogs function to store and log data.
   * @param {String} severity - The log severity.
   * @param {String} message - The message related to the log.
   * @param {Object} author - The author logged in when the log was fired. Can be de ID or the email.
   */
  log(severity, message, author) {
    const logMessage = `:: ${severity}: ${message} - UserId: ${author}`;
    const now = moment.utc().format('MMMM Do YYYY, h:mm:ss a');
    console.log(`>> ${now} ${logMessage}`);
    const audit = new AuditLog({ severity, message, author });
    audit.save();
  }
}

module.exports = new AuditLogService();

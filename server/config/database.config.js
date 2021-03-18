
// @Vendors
const mongoose = require('mongoose');

const config = {
  local: {
    dbname: 'zombie-manager',
    host: 'localhost',
    build() {
      return `mongodb://${this.host}/${this.dbname}`;
    }
  }
};

const environment = process.env.NODE_ENV || 'local';
const connectionString = config[environment].build();

mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log(`Connection with database succeeded in env: ${environment}.`));

exports.db = db;

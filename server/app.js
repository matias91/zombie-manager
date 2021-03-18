// @Vendors
const Hapi = require('hapi');
const fs = require('fs');
const _ = require('lodash');

// @Configs
const config = require('./config/app.config');

// @Database Connection
require('./config/database.config');

const server = new Hapi.Server(config.local);

(async () => {
  let files = fs.readdirSync('./lib/routes');
  files = files.filter(file => file.indexOf('.js') !== -1);

  try {
    _.each(files, (file) => {
      _.each(require(`./lib/routes/${file}`), (routes) => {
        console.log(`Registering route path: ${routes.path}`);
        server.route(routes);
      });
    });
  } catch (err) {
    console.log(err);
  }

  await server.start();

  console.log('Server running at:', server.info.uri);
})();

module.exports = server;

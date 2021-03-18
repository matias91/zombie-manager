const Boom = require('boom');

const port = process.env.PORT || '5000';
console.log('USING PORT: ', port);

module.exports = {
  local: {
    host: 'localhost',
    port,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: [
          'Cache-Control',
          'Accept-Encoding',
          'Accept-Language',
          'Access-Control-Request-Headers',
          'Access-Control-Request-Method',
          'Connection',
          'Host',
          'Pragma',
          'User-Agent'
        ]
      },
      validate: {
        failAction: async (request, h, err) => {
          if (process.env.NODE_ENV === 'production') {
            // In prod, log a limited error message and throw the default Bad Request error.
            console.error('ValidationError:', err.message);
            throw Boom.badRequest(`Invalid request payload input`);
          } else {
            // During development, log and respond with the full error.
            console.error(err);
            throw err;
          }
        }
      }
    }
  }
};

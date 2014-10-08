// Generated by CoffeeScript 1.8.0
var americano, staticMiddleware;

americano = require('americano');

staticMiddleware = americano["static"](__dirname + '/../client/public', {
  maxAge: 86400000
});

module.exports = {
  common: {
    use: [
      staticMiddleware, function(req, res, next) {
        req.url = req.url.replace('/public', '');
        return staticMiddleware(req, res, function(err) {
          if (req.url !== req.originalUrl) {
            req.url = '/public' + req.url;
          }
          return next(err);
        });
      }, americano.bodyParser({
        keepExtensions: true
      }), americano.errorHandler({
        dumpExceptions: true,
        showStack: true
      })
    ],
    set: {
      views: './client'
    }
  },
  development: [americano.logger('dev')],
  production: [americano.logger('short')],
  plugins: ['americano-cozy']
};

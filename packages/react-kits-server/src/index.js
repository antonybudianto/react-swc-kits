import express from 'express';
import morgan from 'morgan';

import serverRender from './serverRenderer';

export function createReactServer(config) {
  const {
    urqlCtx,
    getInitialData,
    homePath,
    assetUrl,
    onRender,
    template,
    customMiddleware = () => {},
  } = config;
  const app = express();
  const loggerEnv = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';
  const logger = morgan(loggerEnv, {
    skip: function (req, res) {
      if (process.env.NODE_ENV === 'development') {
        return false;
      }
      return res.statusCode < 400;
    },
  });

  app.use(logger);

  if (process.env.NODE_ENV === 'development') {
    const { devMiddleware } = require('react-kits/lib/express-dev');
    devMiddleware(app);
  }

  customMiddleware(app);

  app.use(homePath, express.static('dist'));

  app.get(homePath + '(*)', (req, res) => {
    // attach cookies to store object as a way to let cookies to be passed into server fetching
    // req.headers.cookie && (store['cookies'] = req.headers.cookie);
    const promises = getInitialData(req);
    let context = {};
    const iniDataPromise = Promise.all(promises).catch((err) =>
      console.error('Error getInitialData:\n', err)
    );
    iniDataPromise
      .then(() => {
        const data = {
          expressCtx: { req, res },
          context,
          onRender,
          assetUrl,
          template,
          urqlCtx,
        };
        return serverRender(data);
      })
      .then((html) => {})
      .catch((err) => {
        console.error('Error serverRender:\n', err);
      });
  });

  return app;
}

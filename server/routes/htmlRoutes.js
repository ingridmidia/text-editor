const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );

  // Route for favicon
  app.get('/favicon.ico', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/favicon.ico'))
  );

  return app;
}

// Initializes the `playlists` service on path `/playlists`
const { Playlists } = require('./playlists.class');
const hooks = require('./playlists.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/playlists', new Playlists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('playlists');

  service.hooks(hooks);
};

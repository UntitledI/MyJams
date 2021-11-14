// Initializes the `spotify` service on path `/spotify`
const { Spotify } = require('./spotify.class');
const hooks = require('./spotify.hooks');

const { Me } = require('./me.class');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/spotify', new Spotify(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('spotify');

  // Initialize me   
app.use('/Me', new Me(options, app));


  service.hooks(hooks);
app.use('/Recommend',new Recoomendation(options,app));
};

const spotify = require('./spotify/spotify.service.js');
const playlists = require('./playlists/playlists.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(spotify);
  app.configure(playlists);
};

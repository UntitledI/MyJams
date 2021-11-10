const { Service } = require('feathers-mongodb');
//const { Spotify } = require('./spotify.class');

exports.Me = class Me extends Service {
  constructor(options) {
    super(options);
  }

  async find() {
    return 'hi';
  }
};
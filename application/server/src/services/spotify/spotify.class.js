const { Service } = require('feathers-mongodb');

exports.Spotify = class Spotify extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('spotify');
    });
  }
};

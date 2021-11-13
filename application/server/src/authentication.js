const axios = require('axios');
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

class SpotifyStrategy extends OAuthStrategy {
  async getProfile(authResult){
    const accessToken = authResult.access_token;
    const{data} = await axios.get('http://api.spotify.com/v1/me',{
      headers:{
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return data;
  }
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      email: profile.email,
      name: profile.name,
      profilePicutre: profile.images
    };
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('spotify', new SpotifyStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};

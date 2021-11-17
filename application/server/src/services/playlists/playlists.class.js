/* eslint-disable no-unused-vars */
const axios = require('axios');
exports.Playlists = class Playlists {
  constructor (options) {
    this.options = options || {};
  }

  async find () {
    const{data} = await axios.get('http://api.spotify.com/v1/me/playlists',{
      headers:{'Authorization': 'Bearer BQD2oBk0a0Wpmm6E12fyi3jSnEqEn3WIF3eqvEadKR_LGe_9jTOkvbWeLMccbfq5mT5KX4Tl9_465K_mPprw7OuzRipGo0OsQni_XErqTb5QYH3c29F-dPOcq_KyypFzIRqYoqO4MfmrOW_hYhgBJU07sFfKeDbrsFwHYpjfg5bpwE8'}
    }).then();
    return data;
  }

  async get () {
    return 'hi';
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};

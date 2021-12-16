const assert = require('assert');
const app = require('../../src/app');

// eslint-disable-next-line no-undef
describe('\'playlists\' service', () => {
  // eslint-disable-next-line no-undef
  it('registered the service', () => {
    const service = app.service('playlists');

    assert.ok(service, 'Registered the service');
  });
});

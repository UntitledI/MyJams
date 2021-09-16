const assert = require('assert');
const app = require('../../src/app');

describe('\'spotify\' service', () => {
  it('registered the service', () => {
    const service = app.service('spotify');

    assert.ok(service, 'Registered the service');
  });
});

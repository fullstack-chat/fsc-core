require('custom-env').env(true)
const assert = require('assert')

describe('Env Var Tests', function () {
  it('should pull in the TWITCH_CLIENT_ID var', function () {
    assert.equal('abcd123', process.env.TWITCH_CLIENT_ID);
  })
})

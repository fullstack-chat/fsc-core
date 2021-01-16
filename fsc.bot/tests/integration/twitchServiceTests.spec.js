require('custom-env').env(true)
const assert = require('assert')

const twitchService = require('../../src/services/twitchService')

describe('twitchService Tests', function () {
  it('should get the user info', async function () {
    let userInfo = await twitchService.getUserInfo('brianmm02')
    assert.equal(userInfo.id, "108557008")
  })
})

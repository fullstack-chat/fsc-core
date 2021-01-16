require('custom-env').env(true)
const assert = require('assert')

const xpService = require('../../../src/services/xpService')

describe('xpServiceTests', function () {
  it('calculateDecrementMultiplier_3DaysSinceContect_ShouldReturn0.9', function () {
    let daysSinceContact = 3

    let expected = 0.9
    let actual = xpService.calculateDecrementMultiplier(3)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_4DaysSinceContect_ShouldReturn0.8', function () {
    let daysSinceContact = 4

    let expected = 0.8
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_5DaysSinceContect_ShouldReturn0.7', function () {
    let daysSinceContact = 5

    let expected = 0.7
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_6DaysSinceContect_ShouldReturn0.6', function () {
    let daysSinceContact = 6

    let expected = 0.6
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_7DaysSinceContect_ShouldReturn0.5', function () {
    let daysSinceContact = 7

    let expected = 0.5
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_8DaysSinceContect_ShouldReturn0.4', function () {
    let daysSinceContact = 8

    let expected = 0.4
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_9DaysSinceContect_ShouldReturn0.3', function () {
    let daysSinceContact = 9

    let expected = 0.3
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_10DaysSinceContect_ShouldReturn0.2', function () {
    let daysSinceContact = 10

    let expected = 0.2
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_11DaysSinceContect_ShouldReturn0.1', function () {
    let daysSinceContact = 11

    let expected = 0.1
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })

  it('calculateDecrementMultiplier_12DaysSinceContect_ShouldReturn0', function () {
    let daysSinceContact = 12

    let expected = 0
    let actual = xpService.calculateDecrementMultiplier(daysSinceContact)

    assert.equal(actual, expected)
  })


  it('shouldDecrementXp_3DaysNullPenalty_ShouldReturnTrue', function () {
    let daysSinceContact = 3.123123
    let penaltyCount;

    let expected = true
    let actual = xpService.shouldDecrementXp(daysSinceContact, penaltyCount)

    assert.equal(actual, expected)
  })
  
  it('shouldDecrementXp_4Days0Penalty_ShouldReturnFalse', function () {
    let daysSinceContact = 4.123123
    let penaltyCount = 0

    let expected = false
    let actual = xpService.shouldDecrementXp(daysSinceContact, penaltyCount)

    assert.equal(actual, expected)
  })
  
  it('shouldDecrementXp_11Days8Penalty_ShouldReturnTrue', function () {
    let daysSinceContact = 11.123123
    let penaltyCount = 8

    let expected = true
    let actual = xpService.shouldDecrementXp(daysSinceContact, penaltyCount)

    assert.equal(actual, expected)
  })

})

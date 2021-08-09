const FaunaService = require('./FaunaService')
const log = require('../logger')

const twentyFourHoursInMs = 86400000
const fiveMinInMs = 300000;
const levelUpConst = 0.4;
const rowKey = 'xpdata'

let data = {}

// FaunaDB Implementation
let _faunaService;
let collectionName = "fsc-bot-data"
let indexName = "idxByKey"
let faunaRecordId;
let faunaData = {}

exports.init = async function () {
  // data = await tableService.fetch(rowKey, data);

  try {
    _faunaService = new FaunaService(process.env.FAUNA_SECRET);
    let record = await _faunaService.getRecordByIndex(indexName, rowKey);
    faunaRecordId = record.id
    data = record.document
  } catch(err) {
    log.error(`xpService.init: ${err.toString()}`)
  }
}

const save = async function () {
  // await tableService.save(rowKey, data);

  try {
    // faunaData = data;
    await _faunaService.updateRecord(collectionName, faunaRecordId, {
      document: data
    })
  } catch(err) {
    log.error(`xpService.save: ${err.toString()}`)
  }
}

exports.getXpForUserId = function(userId) {
  return data[userId].currentXp
}

exports.getLevelForUserId = function (userId) {
  let currentXp = data[userId].currentXp
  return getLevelByXp(currentXp)
}

exports.logXp = async function (message, userId, username) {
  log.info(`Logging message for ${username}`)
  let currentTimestamp = Date.now()
  let user = data[userId]
  let isNew = false;
  if(!user) {
    log.info('User not found, creating new...')
    isNew = true;
    user = {
      lastXpAppliedTimestamp: currentTimestamp,
      currentXp: 0,
      multiplier: 1,
      username: username,
      penaltyCount: 0
    }
  }

  // Clear penalties
  if(!user.penaltyCount || user.penaltyCount > 0) {
    user.penaltyCount = 0
  }

  // Five min timeout
  if(isNew || (currentTimestamp - user.lastXpAppliedTimestamp) > fiveMinInMs) {
    // If its been longer than 24 hours since we heard from you, reset the multiplier
    if ((currentTimestamp - user.lastXpAppliedTimestamp) > twentyFourHoursInMs) {
      log.info('Multipler getting reset...')
      user.multiplier = 1
    } else if(user.lastXpAppliedTimestamp !== currentTimestamp && user.multiplier < 5) {
      log.info('Bumping multiplier!!!')
      user.multiplier++
    } else {
      log.info('Maxium multiplier detected, go go user!')
    }
    let newXp = user.currentXp + user.multiplier
    log.info(`Adding XP, was ${user.currentXp}, now is ${newXp}`)

    // Actually apply the xp
    let levelResults = processXpLevel(user.currentXp, newXp)
    if(levelResults.isLeveledUp) {
      message.channel.send(`🔼 **${username}** is now level **${levelResults.currentLevel}**!`)
    }

    // Automatically assign the active role
    if(levelResults.isTransitioningToActive) {
      try {
        let role = message.member.roles.cache.find(role => role.id === process.env.ACTIVE_ROLE_ID);
        if (role) {
          message.member.guild.roles.add(role);
        }
      } catch (err) {
        log.error(err)
      }
    }

    user.currentXp = newXp
    user.lastXpAppliedTimestamp = currentTimestamp
    data[userId] = user

    await save()
  } else {
    log.info("5 min timeout not hit, ignoring...")
  }
}

const processXpLevel = function (previousXp, newXp) {
  let isTransitioningToActive = false;
  let oldLevel = getLevelByXp(previousXp)
  let newLevel = getLevelByXp(newXp)
  let isLeveledUp = false;
  if(newLevel > oldLevel) {
    isLeveledUp = true;

    if(newLevel >= 5) {
      isTransitioningToActive = true;
    }
  }
  return {
    isLeveledUp: isLeveledUp,
    currentLevel: newLevel,
    isTransitioningToActive
  }
}

/**
 * Returns an array of usernames at or above the given level
 * @param {Number} level
 */
exports.getUsersAtOrAboveXp = function (xp) {
  let users = []
  Object.keys(data).forEach(key => {
    if(data[key].currentXp >= xp) {
      users.push(data[key].username)
    }
  })
  return users
}

/**
 * Calculates the level that the XP is currently
 * @param  {Number} xp - The XP to calculate
 */
const getLevelByXp = function (xp) {
  return Math.floor(levelUpConst * Math.sqrt(xp))
}

/**
 * Calculates the XP required to get to the specified level
 * @returns {Number} The XP required
 * @param {Number} level - The level to calculate the required XP for
 */
exports.getXpByLevel = function (level) {
  return Math.ceil(Math.pow(level / levelUpConst, 2))
}

/**
 * Scans all users and determines if they should lose XP based on activity.
 */
exports.processDecrementXpScript = function() {
  // Get all the users
  let currentTimestamp = Date.now()
  Object.keys(data).forEach(userId => {
    let daysSinceContact = (currentTimestamp - data[userId].lastXpAppliedTimestamp) / twentyFourHoursInMs
    let shouldDecrementXp = exports.shouldDecrementXp(daysSinceContact, data[userId].penaltyCount)

    if(shouldDecrementXp) {
      let decrementedXp = calculateDecrementedXp(data[userId].currentXp, daysSinceContact)
      log.info(`[NO ACTION] Decrementing XP for user ${data[userId].username} from ${data[userId].currentXp} (${typeof(data[userId].currentXp)}) to ${decrementedXp} (${typeof(decrementedXp)})...`)
      // data[userId].currentXp = decrementedXp
      if(data[userId].penaltyCount) {
        data[userId].penaltyCount++
      } else {
        data[userId].penaltyCount = 1
      }
    }
  })
}

/**
 * Calculates the new XP for the user
 * @returns {Number} the new XP for the user
 * @param  {Number} currentXp - The users current XP
 * @param  {Number} daysSinceContact - Number of days since we last heard from the user
 */
const calculateDecrementedXp = function (currentXp, daysSinceContact) {
  let decrementMultiplier = exports.calculateDecrementMultiplier(daysSinceContact)
  return currentXp * decrementMultiplier
}

/**
 * Calculates the multiplier for which the users XP should be decremented by
 * @returns {Number} the calculated multiplier
 * @param  {Number} daysSinceContact - Number of days since we last heard from the user
 */
exports.calculateDecrementMultiplier = function (daysSinceContact) {
  let difference = ((daysSinceContact - 2) * 0.1).toFixed(1)
  return (1 - difference).toFixed(1)
}

/**
 * Determines if a user should have their XP decremented
 * @returns {Boolean}
 * @param  {Number} daysSinceContact - Number of days since we last heard from the user
 * @param  {Number} penaltyCount - The users current penalty count
 */
exports.shouldDecrementXp = function (daysSinceContact, penaltyCount) {
  if(!penaltyCount || penaltyCount == undefined || penaltyCount == null) {
    penaltyCount = 0
  }
  daysSinceContact = Math.floor(daysSinceContact)

  if(daysSinceContact > 12) {
    return false;
  }

  return daysSinceContact === (penaltyCount + 3)
}


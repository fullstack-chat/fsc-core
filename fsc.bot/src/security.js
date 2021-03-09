const { asyncForEach } = require('./helpers')

exports.isMod = async function (message, userId) {
  let modIds = message.guild.members.cache
    .array()
    .filter(u => u._roles.includes(process.env.MODS_ROLE_ID))
    .map(u => u.user.id)
  return modIds.includes(userId)
}

exports.sendModBroadcast = async function (guild, messageContent) {
  let mods = guild.members.cache
    .array()
    .filter(u => u._roles.includes(process.env.MODS_ROLE_ID))

  await asyncForEach(mods, async mod => {
    await mod.send(messageContent);
  })
}
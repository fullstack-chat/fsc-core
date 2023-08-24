import { asyncForEach } from './helpers'

// TODO: type these
export async function isMod(message: any, userId: string) {
  let modIds = message.guild.members.cache
    .array()
    .filter((u: any) => u._roles.includes(process.env.MODS_ROLE_ID))
    .map((u: any) => u.user.id)
  return modIds.includes(userId)
}

// TODO: type these
export async function sendModBroadcast(guild: any, messageContent: string) {
  let mods = guild.members.cache
    .array()
    .filter((u: any) => u._roles.includes(process.env.MODS_ROLE_ID))

  await asyncForEach(mods, async (mod: any) => {
    await mod.send(messageContent);
  })
}
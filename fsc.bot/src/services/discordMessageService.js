const { asyncForEach } = require('../helpers');
const { Message } = require('discord.js');

exports.updateMessageContent = async function (message, targetMessageId, content) {
  let textChannels = message.channel.guild.channels.cache.array().filter(c => c.type == 'text')
  let target;

  await asyncForEach(textChannels, async channel => {
    try {
      if(!target) {
        let theMessage = await channel.messages.fetch(targetMessageId)
        if(theMessage) {
          target = theMessage
        }
      }
    } catch (err) {
      // do nothing
    }
  })

  if(target && target instanceof Message) {
    await target.edit(content)
  } else {
    console.error('Unable to find message with id', targetMessageId)
  }
}

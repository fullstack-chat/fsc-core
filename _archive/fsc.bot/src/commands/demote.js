const subDays = require('date-fns/subDays');
const security = require('../security')

module.exports = {
  command: 'demote',
  isEnabled: false,
  fn: async msg => {
    let isMod = await security.isMod(msg, msg.author.id)

    if(!isMod) {
        return;
    }

    //Get date 60 days ago.
    const threshold = subDays(Date.now(), 59)

    //Get list of active members.
    let activeMembers = msg.guild.roles.cache.get('697134824049082438').members.array();

    //For each active member, find their last sent message.
    for (let index = 0; index < activeMembers.length; index++) {
        const member = activeMembers[index];
        console.log(member)
        

        try {
            const channel = msg.guild.channels.cache.find(channel => channel.id === member.lastMessageChannelID)
            const message = await channel.messages.fetch(member.lastMessageID)

            //If message is older than 60 days, remove 'Active' rank.
            if(message.createdAt < threshold) {
                msg.channel.send(`Demoting ${member.user.username}.`)
                member.roles.remove('697134824049082438').catch(console.error);
            }
        } catch(e) {
            console.log("Channel/Message no longer exists.")
            continue;
        }
    }

    return msg.reply("Done.");
  }
}

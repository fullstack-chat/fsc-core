const axios = require('axios')

const helpText = `
  Command: joke
  Description: So funny, much laughing, wow...
  Subcommands: none
  Examples:
    - Input: !w joke
      Output: @brianmmdev You are level 15 with 1445xp
`

module.exports = {
  command: 'joke',
  isEnabled: false,
  helpText,
  fn: async msg => {
    let res = await axios.get("https://icanhazdadjoke.com/", {
      headers: {
        Accept: 'application/json'
      }
    });
    const { joke } = res.data;
    msg.reply(joke);
  }
}

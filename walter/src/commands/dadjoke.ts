import { Command } from "../models/command"

const helpText = `
  Command: joke
  Description: So funny, much laughing, wow...
  Subcommands: none
  Examples:
    - Input: !w joke
      Output: @brianmmdev You are level 15 with 1445xp
`

export const dadJoke: Command = {
  command: 'joke',
  isEnabled: true,
  helpText,
  fn: async msg => {
    let res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: 'application/json'
      }
    });
    const body = await res.json()
    const { joke } = body;
    msg.reply(joke);
  }
}


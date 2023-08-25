import { Logger } from 'winston'
import { Command } from '../models/command'

export class CommandManager {
  log: Logger
  commands: {[key:string]: Command} = {}

  constructor(logger: Logger){
    this.log = logger
  }

  registerCommand(command: Command) {
    if(command.isEnabled) {
      this.commands[command.command] = command
    }
  }

  async handleMessage(message: any) {
    const cmd = message.content.split(' ')[1];

    // Handle global `help` cmd
    if(cmd && cmd.toLowerCase() === 'help') {
      await message.author.send(this.getHelpText())
      await message.delete()
      return;
    }

    // User entered an invalid command
    if(!this.commands[cmd]) {
      this.log.info('Unable to find command', cmd)
      return
    }

    // Command based help
    const subCommand = message.content.split(' ')[2]
    if(subCommand && subCommand.toLowerCase() === 'help') {
      if(this.commands[cmd].helpText) {
        let helpResponse = `**!w ${this.commands[cmd].command} help:**`
        helpResponse += '\n```yaml'
        helpResponse += `${this.commands[cmd].helpText}\n`
        helpResponse += '```\n'
        await message.author.send(helpResponse)
        await message.delete()
        return
      }
    }

    await this.commands[cmd].fn(message)

    if(this.commands[cmd].shouldCleanup) {
      await message.delete()
    }
  }

  getHelpText(): string {
    let helpResponse = "**Walter Help**\n'!w' is used to call Walter, followed by one of these commands:\n\n"
    Object.keys(this.commands).forEach(c => {
      if(this.commands[c].helpText) {
        helpResponse += `**!w ${this.commands[c].command}:**`
        helpResponse += '\n```yaml'
        helpResponse += `${this.commands[c].helpText}\n`
        helpResponse += '```\n'
      }
    })
    return helpResponse
  }
}
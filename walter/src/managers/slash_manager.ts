import { ChatInputCommandInteraction, Interaction, REST, Routes } from "discord.js";
import SlashCommand, { SlashCommandOptionType } from "../models/slash_command";
import { Logger } from "winston";

export default class SlashCommandManager {
  log: Logger
  rest: REST
  commands: {[key: string]: SlashCommand} = {}

  constructor(log: Logger) {
    this.log = log
    // TODO: use token & app id in ctor
    this.rest = new REST().setToken(process.env.BOT_TOKEN!);
  }

  async addCommand(command: SlashCommand) {
    if(command.options) {
      for(const opt of command.options) {
        if(opt.type === SlashCommandOptionType.STRING) {
          command.builder.addStringOption(option =>
            option.setName(opt.name)
              .setDescription(opt.description)
              .setRequired(opt.required)
          )
        }
        if(opt.type === SlashCommandOptionType.INTEGER) {
          command.builder.addNumberOption(option =>
            option.setName(opt.name)
              .setDescription(opt.description)
              .setRequired(opt.required)
          )
        }
        if(opt.type === SlashCommandOptionType.BOOLEAN) {
          command.builder.addBooleanOption(option =>
            option.setName(opt.name)
              .setDescription(opt.description)
              .setRequired(opt.required)
          )
        }
      }
    }
    this.commands[command.builder.name] = command
  }

  async registerCommands() {
    const registerCommandsBody = Object.keys(this.commands)
      .map((k: string) => this.commands[k].builder.toJSON())

    await this.rest.put(
      Routes.applicationGuildCommands(process.env.APPLICATION_ID!, process.env.GUILD_ID!),
      {
        body: registerCommandsBody
      }
    );
  }

  async handleCommand(interaction: ChatInputCommandInteraction) {
    const command = this.commands[interaction.commandName]

    if (!command) {
      this.log.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      this.log.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true
        });
      }
    }
  }

  getHelpText(): string {
    let helpResponse = "**Walter Help**\n\n"
    Object.keys(this.commands).forEach(c => {
      if(this.commands[c].helpText) {
        helpResponse += `**/${this.commands[c].name}:**`
        helpResponse += '\n```yaml'
        helpResponse += `${this.commands[c].helpText}\n`
        helpResponse += '```\n'
      }
    })
    return helpResponse
  }
}
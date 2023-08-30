import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../models/slash_command";

const helpText = `
  Command: joke
  Description: So funny, much laughing, wow...
  Subcommands: none
  Examples:
    - Input: /joke
      Output: Why did the chicken cross the road?
`

export const joke: SlashCommand = {
  name: "joke",
  helpText,
  builder: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("So funny, much laughing, wow..."),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply();

    let res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: 'application/json'
      }
    });
    const body = await res.json()
    const { joke } = body;

    return interaction.editReply(joke);
  },
};


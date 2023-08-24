import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const command = {
  data: new SlashCommandBuilder().setName("hello").setDescription("Says hello"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    return interaction.editReply(`Yo, am walkin over here`);
  },
};

export default command;

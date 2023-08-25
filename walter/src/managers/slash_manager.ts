import { join } from "path";
import { readdirSync } from "fs";

export const commandsList: any[] = [];
const commandsPath = join(__dirname, "../slash");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".js"));

async function registerSlashCommands() {
  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);

    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command.default && "execute" in command.default) {
      commandsList.push({ data: command.default.data.toJSON(), execute: command.default.execute });
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  return commandsList;
}

export { registerSlashCommands };

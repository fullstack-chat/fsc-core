import { ICommand } from "@victorbotjs/core";
import Message from "@victorbotjs/core/dist/models/Message";

class DadJokeCommand implements ICommand {
  commandText: string = "heydad";

  exec(message: Message): void {
    message.reply("How do you get a squirrel to like you? Act like a nut.")
  }
}

export default DadJokeCommand
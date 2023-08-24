import { readdirSync } from 'fs'
import { resolve } from 'path'
import { logger as log } from './logger' 
import { Command } from './models';

export async function asyncForEach(array: any[], callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
export function rng(min: number, max: number): number {
  var num = Math.random() * (max - min) + min;
  return Math.floor(num)
}

export async function parseCommands(): Promise<{[key: string]:Command}> {
  const commands: {[key: string]:Command} = {}

  let files = await readdirSync(__dirname + '/commands')

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const imported = require(resolve(__dirname + `/commands/${file}`));
      if (imported.command && imported.fn && imported.isEnabled) {
        commands[imported.command] = imported
    }
    
    //Added alias command support
    if (imported.aliases && imported.fn && imported.isEnabled) {
      for (let i = 0; i < imported.aliases.length; i++) {
        commands[imported.aliases[i]] = imported;
      }
    }

  }

  log.info('Registered commands are:\n')
  Object.keys(commands).forEach(c => log.info(c))
  return commands;

}
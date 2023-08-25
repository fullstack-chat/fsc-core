const fs = require("fs");
const path = require("path");
const log = require('./logger')

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.rng = function (min, max) {
  var num = Math.random() * (max - min) + min;
  return Math.floor(num)
}

exports.parseCommands = async function () {
  const commands = {}

  let files = await fs.readdirSync(__dirname + '/commands')

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const imported = require(path.resolve(__dirname + `/commands/${file}`));
      if (imported.command && imported.fn && imported.isEnabled) {
        commands[imported.command] = imported
    }
    
    //Added alias command support
    if (imported.aliases && imported.fn && imported.isEnabled) {
      for (i = 0; i < imported.aliases.length; i++) {
        commands[imported.aliases[i]] = imported;
      }
    }

  }

  log.info('Registered commands are:\n')
  Object.keys(commands).forEach(c => log.info(c))
  return commands;
}
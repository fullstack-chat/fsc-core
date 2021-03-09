const fs = require('fs')

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
  // TODO: Figure out a better way to parse in commands
  const files = fs.readdirSync(process.env.CMDS_ROOT)
  const jsFiles = files.filter(file => file.endsWith('.js'))
  jsFiles.forEach(commandFile => {
    const imported = require(`./commands/${commandFile}`)
    if (imported.command && imported.fn && imported.isEnabled) {
      commands[imported.command] = imported
    }
  })
  console.log('Registered commands are:\n')
  Object.keys(commands).forEach(c => console.log(c))
  return commands;
}
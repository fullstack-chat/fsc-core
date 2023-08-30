const dotenv = require('dotenv')
dotenv.config()
const djs = require('discord.js');


(async() => {
  const rest = new djs.REST()
  rest.setToken(process.env.BOT_TOKEN);
  await rest.put(
    djs.Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID), 
    { 
      body: []
    }
  );
})()
  
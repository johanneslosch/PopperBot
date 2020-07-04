require("dotenv").config();

const file = require("fs");
const { CommandoClient } = require("discord.js-commando");
const path = require("path");

const client = new CommandoClient({
  commandPrefix: "!",
  owner: process.env.OWNER_ID,
  disableEveryone: true,
  unknownCommandResponse: false,
});
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["reference", "Educational commands"],
    ["fetch", "Web scraping powered commands"],
    ["fun", "Humorous / fun Commands"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

// client.on("error", (error) => logger.error(error));
// client.on("warn", (warning) => logger.warn(warning));
// client.on("debug", (dbgMsg) => logger.debug(dbgMsg));

client.on("ready", () => {
  console.log(`Connected as: ${client.user.tag}!`);
});

client.login(process.env.TOKEN).catch((error) => {
  console.red(`${error}\n`);
});

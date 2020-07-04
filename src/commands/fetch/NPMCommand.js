const { Command } = require("discord.js-commando");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = class MDNCommand extends Command {
  constructor(client) {
    super(client, {
      name: "npm",
      group: "fetch",
      memberName: "npm",
      description: "Loads a package from the NPM registry and links ot it",
      examples: ["mdn array slice"],
      throttling: {
        usages: 1,
        duration: 10,
      },
      args: [
        {
          key: "query",
          prompt: "What do you want to search NPM for?",
          type: "string",
        },
      ],
    });
  }

  async run(msg, { query }) {
    const encodedQuery = encodeURIComponent(query);

    try {
      const url = `https://www.npmjs.com/search?q=`;
      const res = await fetch(`${url}${encodedQuery}`);
      const text = await res.text();

      const $ = cheerio.load(text);
      const firstResult = $(".pr3 a");
      const responseUrl = firstResult.attr("href");

      const formattedUrl = "https://www.npmjs.com" + responseUrl;

      return msg.say(`I've located that for you: ${formattedUrl}`);
    } catch (error) {
      console.error(error);
    }
  }
};

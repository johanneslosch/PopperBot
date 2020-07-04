const { Command } = require("discord.js-commando");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = class MDNCommand extends Command {
  constructor(client) {
    super(client, {
      name: "mdn",
      group: "fetch",
      memberName: "mdn",
      description:
        "Loads documentation from Mozilla Developer Network based on keywords",
      examples: ["mdn array slice"],
      throttling: {
        usages: 1,
        duration: 10,
      },
      args: [
        {
          key: "query",
          prompt: "What do you want to search MDN for?",
          type: "string",
        },
      ],
    });
  }

  async run(msg, { query }) {
    const encodedQuery = encodeURIComponent(query);

    try {
      const url = `https://developer.mozilla.org/en-US/search?q=`;
      const res = await fetch(`${url}${encodedQuery}`);
      const text = await res.text();

      const $ = cheerio.load(text);
      const firstResult = $(".result div a");
      const responseUrl = firstResult.attr("href");
      console.log(responseUrl);

      if (responseUrl) {
        const formattedUrl = "https://developer.mozilla.org/" + responseUrl;

        return msg.say(`I've located that for you: ${formattedUrl}`);
      }
      return msg.say(
        `I'm sorry, I wasn't able to find a result for "${query}"`
      );
    } catch (error) {
      console.error(error);
    }
  }
};

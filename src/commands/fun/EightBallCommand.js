const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = class CatusCodeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "8ball",
      group: "fun",
      memberName: "8ball",
      description: "Displays a random message from the magical discord 8-ball",
      examples: ["catuscode 500", "catuscode 301"],
      throttling: {
        usages: 1,
        duration: 10,
      },
      args: [
        {
          key: "question",
          prompt: "What is your question?",
          type: "string",
        },
      ],
    });
  }

  async run(msg, { question }) {
    const answers = [
      "As I see it, yes.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don’t count on it.",
      "It is certain.",
      "It is decidedly so.",
      "Most likely.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Outlook good.",
      "Reply hazy, try again.",
      "Signs point to yes.",
      "Very doubtful.",
      "Without a doubt.",
      "Yes.",
      "Yes – definitely.",
      "You may rely on it.",
    ];

    const randomNum = Math.floor(Math.random() * (answers.length - 0) + 0);
    const selectedAnswer = answers[randomNum];

    try {
      msg.say(selectedAnswer);
    } catch (error) {
      console.error(error);
    }
  }
};

const userSchema = require("../../schemas/userSchema");
const { prefix } = require("../../config.json");
let coolDown = new Set();
let cdSecs = 43200;

module.exports = {
  commands: ["daily", "day"],
  expectedArgs: "",
  economyCheck: "true",
  callback: async (message, args, Discord, client, mongo) => {
    const user = message.member.user;
    const dailyjobs = ["You sold your hair for"];
    const randomJobs = Math.floor(Math.random() * dailyjobs.length);
    if(coolDown.has(message.author.id)) {
      return message.channel.send("You must wait 1 day inbetween using this command.")
    }
    await mongo().then(async (mongoose) => {
      try {
        let moneyToBase = 0;
        if (message.member.roles.cache.has("838596018856919040")) {
          //Staff
          moneyToBase = 100000;
        }
        if (message.member.roles.cache.has("974617601667919902")) {
          //Test Team
          moneyToBase = 200000;
        }

        const userResult = await userSchema.findOne({ _id: user });

        if (!userResult || !userResult.money) {
          return message.channel.send(
            "You must have at least 1 BBC to use the daily command."
          );
        }

        const embedForMoney = new Discord.MessageEmbed();

        let newUserMoney = 0;
        let amountToAdd;

          if (userResult.level == 1) {
            const randomizer = Math.floor(Math.random() * 70000);
            amountToAdd = moneyToBase + randomizer;
            newUserMoney = userResult.money + moneyToBase + randomizer;
            await userSchema.findOneAndUpdate(
              {
                _id: user,
              },
              {
                money: newUserMoney,
              },
              {
                upsert: true,
              }
            );
            embedForMoney
              .setFooter(`Level 1 gave you ${randomizer} extra.`)
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/905726406552600586/969812847381057556/bronze-removebg-preview.png"
              )
              .setColor("#644223");
          } else if (userResult.level == 2) {
            const randomizer = Math.floor(Math.random() * 150000);
            amountToAdd = moneyToBase + randomizer;
            newUserMoney = userResult.money + moneyToBase + randomizer;
            await userSchema.findOneAndUpdate(
              {
                _id: user,
              },
              {
                money: newUserMoney,
              },
              {
                upsert: true,
              }
            );
            embedForMoney
              .setFooter(`Level 2 gave you ${randomizer} extra.`)
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/905726406552600586/969812848458993694/silvaa-removebg-preview.png"
              )
              .setColor("#a7b2b9");
          } else if (userResult.level == 3) {
            const randomizer = Math.floor(Math.random() * 300000);
            amountToAdd = moneyToBase + randomizer;
            newUserMoney = userResult.money + moneyToBase + randomizer;
            await userSchema.findOneAndUpdate(
              {
                _id: user,
              },
              {
                money: newUserMoney,
              },
              {
                upsert: true,
              }
            );
            embedForMoney
              .setFooter(`Level 3 gave you ${randomizer} extra.`)
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/905726406552600586/969812847628546078/gowld-removebg-preview.png"
              )
              .setColor("#f2ba2d");
          } else if (userResult.level == 4) {
            const randomizer = Math.floor(Math.random() * 600000);
            amountToAdd = moneyToBase + randomizer;
            newUserMoney = userResult.money + moneyToBase + randomizer;
            await userSchema.findOneAndUpdate(
              {
                _id: user,
              },
              {
                money: newUserMoney,
              },
              {
                upsert: true,
              }
            );
            embedForMoney
              .setFooter(`Level 4 gave you ${randomizer} extra.`)
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/905726406552600586/969812848165400616/Plat-removebg-preview.png"
              )
              .setColor("#9b2b61");
          } else if (userResult.level == 5) {
            const randomizer = Math.floor(Math.random() * 1000000);
            amountToAdd = moneyToBase + randomizer;
            newUserMoney = userResult.money + moneyToBase + randomizer;
            await userSchema.findOneAndUpdate(
              {
                _id: user,
              },
              {
                money: newUserMoney,
              },
              {
                upsert: true,
              }
            );
            embedForMoney
              .setFooter(`Level 5 gave you ${randomizer} extra.`)
              .setThumbnail(
                "https://cdn.discordapp.com/attachments/905726406552600586/969812847917932554/Highest-removebg-preview.png"
              )
              .setColor("#a084a3");
          } else if (userResult.level == 0 || !userResult.level) {
            const randomizer = Math.floor(Math.random() * 10000);
            amountToAdd = moneyToBase + randomizer;
            newUserMoney = userResult.money + moneyToBase + randomizer;
            await userSchema.findOneAndUpdate(
              {
                _id: user,
              },
              {
                money: newUserMoney,
              },
              {
                upsert: true,
              }
            );
            embedForMoney.setColor("BLACK");
          }

        embedForMoney
          .setAuthor(`${message.member.displayName} | ${amountToAdd} BBC`, user.displayAvatarURL({ format: 'jpg', dynamic: true }))
          .setDescription(`You just got **${amountToAdd}** BBC`)
        message.channel.send(embedForMoney);

        coolDown.add(message.author.id)
        setTimeout(() => {
          coolDown.delete(message.author.id)
      }, cdSecs * 1000)
      } finally {
        mongoose.connection.close();
      }
    });
  },
};

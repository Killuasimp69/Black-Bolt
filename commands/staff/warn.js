const { prefix } = require("../../config.json");
const userSchema = require("../../schemas/userSchema");
const warnSchema = require("../../schemas/warnSchema");
const mongo = require("../../mongo");

module.exports = {
  commands: ["warn"],
  expectedArgs: "(user) (reason)",
  permissionError:
    "You do not have the required permissions to execute this command",
  minArgs: 1,
  callback: async (message, args, Discord, client) => {
    if (message.content.startsWith(`${prefix}warns`)) return;
    if (!message.member.roles.cache.has("838596018856919040")) {
      message.channel.send("Sorry, you cant use that command.");
    } else {
      if (!message.mentions.members.first()) {
        message.channel.send("Sorry, I cant find that user");
      } else {
        if (!args[1]) {
          message.channel.send("You must provide a reason");
        } else {
          if (message.guild.id == "804323987106168842") {
            await mongo().then(async (mongoose) => {
              try {
                let warnNumber;
                message.delete();
                const reason = message.content.replace(
                  `${prefix}warn ${args[0]} `,
                  ``
                );
                const memeberToWarn = message.mentions.members.first();
                const user = message.mentions.members.first().user;
                const userResult = await userSchema.findOne({ _id: user });
                const warningfirst = Math.floor(
                  Math.random() * (10000000000 - 100000) + 100000
                );
                const warnID = "$" + warningfirst;
                const warnResult = await warnSchema.findOne({ _id: warnID });

                var currentdate = new Date();
                var yestime =
                  "Last Sync: " +
                  currentdate.getDate() +
                  "/" +
                  (currentdate.getMonth() + 1) +
                  "/" +
                  currentdate.getFullYear() +
                  " @ " +
                  currentdate.getHours() +
                  ":" +
                  currentdate.getMinutes() +
                  ":" +
                  currentdate.getSeconds();
                var datetime = yestime.replace(`Last Sync: `, ``);

                if (userResult == null) {
                  warnNumber = 1;
                } else {
                  warnNumber = parseFloat(userResult.warns) + 1;
                }
                //templates

                const channelTemplate = new Discord.MessageEmbed()
                  .setAuthor(
                    `${memeberToWarn.displayName}`,
                    user.displayAvatarURL({ format: "jpg", dynamic: true })
                  )
                  .setDescription(reason)
                  .setFooter(`ID: ${warnID}`)
                  .setColor("BLACK");

                const EmbedForWarnUser = new Discord.MessageEmbed()
                  .setTitle("You have been warned")
                  .addField(`Reason:`, `${reason}`)
                  .setFooter(`ID: ${warnID}`)
                  .setColor("BLACK");

                //database

                if (warnResult) {
                  return message.channel.send(
                    "Critcal Error. Please pardon this users warn"
                  );
                } else {
                  await warnSchema.findOneAndUpdate(
                    {
                      _id: warnID,
                    },
                    {
                      mod: message.author.tag,
                    },
                    {
                      upsert: true,
                    }
                  );
                  await warnSchema.findOneAndUpdate(
                    {
                      _id: warnID,
                    },
                    {
                      warneduser: memeberToWarn.user.tag,
                    },
                    {
                      upsert: true,
                    }
                  );
                  await warnSchema.findOneAndUpdate(
                    {
                      _id: warnID,
                    },
                    {
                      warneduserID: memeberToWarn.id,
                    },
                    {
                      upsert: true,
                    }
                  );
                  await warnSchema.findOneAndUpdate(
                    {
                      _id: warnID,
                    },
                    {
                      warning: reason,
                    },
                    {
                      upsert: true,
                    }
                  );
                  await warnSchema.findOneAndUpdate(
                    {
                      _id: warnID,
                    },
                    {
                      time: datetime,
                    },
                    {
                      upsert: true,
                    }
                  );
                  await warnSchema.findOneAndUpdate(
                    {
                      _id: warnID,
                    },
                    {
                      warnNum: warnNumber,
                    },
                    {
                      upsert: true,
                    }
                  );
                }

                if (userResult) {
                } else {
                  await userSchema.findOneAndUpdate(
                    {
                      _id: user,
                    },
                    {
                      money: "900",
                    },
                    {
                      upsert: true,
                    }
                  );

                  await userSchema.findOneAndUpdate(
                    {
                      _id: user,
                    },
                    {
                      warns: "1",
                    },
                    {
                      upsert: true,
                    }
                  );

                  await warnSchema.findOneAndUpdate(
                    {
                      _id: warnID,
                    },
                    {
                      warnNum: warnNumber,
                    },
                    {
                      upsert: true,
                    }
                  );

                  channelTemplate.setTitle(`Warning 1`);
                  memeberToWarn.send(EmbedForWarnUser).catch((err) => {
                    channelTemplate.setFooter("Could not dm user");
                  });
                  return message.channel.send(channelTemplate);
                }

                if (!userResult.money || !userResult.warns) {
                  await userSchema.findOneAndUpdate(
                    {
                      _id: user,
                    },
                    {
                      money: "900",
                    },
                    {
                      upsert: true,
                    }
                  );

                  await userSchema.findOneAndUpdate(
                    {
                      _id: user,
                    },
                    {
                      warns: "1",
                    },
                    {
                      upsert: true,
                    }
                  );

                  await warnSchema.findOneAndUpdate(
                    {
                      _id: warnID,
                    },
                    {
                      warnNum: warnNumber,
                    },
                    {
                      upsert: true,
                    }
                  );

                  memeberToWarn.send(EmbedForWarnUser).catch((err) => {
                    channelTemplate.setFooter("Could not dm user");
                  });
                  channelTemplate.setTitle(`Warning 1`);
                  return message.channel.send(channelTemplate);
                }

                const newMoney =
                  parseFloat(userResult.money) - parseFloat("100");
                const newWarns = parseFloat(userResult.warns) + parseFloat("1");

                await userSchema.findOneAndUpdate(
                  {
                    _id: user,
                  },
                  {
                    money: newMoney,
                  },
                  {
                    upsert: true,
                  }
                );

                await userSchema.findOneAndUpdate(
                  {
                    _id: user,
                  },
                  {
                    warns: newWarns,
                  },
                  {
                    upsert: true,
                  }
                );

                memeberToWarn.send(EmbedForWarnUser).catch((err) => {
                  channelTemplate.setFooter("Could not dm user");
                });

                channelTemplate.setTitle(`Warning ${newWarns}`);
                message.channel.send(channelTemplate);
              } finally {
                mongoose.connection.close();
              }
            });
          } else {
            const reason = message.content.replace(
              `${prefix}warn ${args[0]} `,
              ``
            );
            const memeberToWarn = message.mentions.members.first();
            const user = message.mentions.members.first().user;

            //templates

            const channelTemplate = new Discord.MessageEmbed()
              .setAuthor(
                `${memeberToWarn.displayName}`,
                user.displayAvatarURL({ format: "jpg", dynamic: true })
              )
              .setTitle(`Warning`)
              .setDescription(reason)
              .setColor("BLACK");

            const EmbedForWarnUser = new Discord.MessageEmbed()
              .setTitle("You have been warned")
              .addField(`Reason:`, `${reason}`)
              .setColor("BLACK");

            memeberToWarn.send(EmbedForWarnUser).catch((err) => {
              channelTemplate.setFooter("Could not dm user");
            });

            message.channel.send(channelTemplate);
          }
        }
      }
    }
  },
};

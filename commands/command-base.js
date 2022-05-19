const { prefix } = require("../config.json");
const Discord = require("discord.js");
const mongo = require("../mongo");
const userSchema = require("../schemas/userSchema");
const commandSchema = require("../schemas/commandSchema");

const validatePermissions = (permissions) => {
  const validPermissions = [
    "ADMINISTRATOR",
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}`);
    }
  }
};

module.exports = async (client, commandOptions) => {
  let {
    commands,
    expectedArgs = "",
    permissionError = "You do not have the required permissions to execute this command",
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  //Ensure command is array

  if (typeof commands === "string") {
    commands = [commands];
  }

  //Ensure perms is array and valid

  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  //listen for message

  client.on("message", async (message) => {
    const { member, content, guild } = message;
    for (const alias of commands) {
      if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
        if (message.guild === null) {
          return;
        }

        await mongo().then(async (mongoose) => {
          try {
            //check if command enabled
            const commandResult = await commandSchema.findOne({
              _id: commands[0],
            });
            if (!commandResult) {
              await commandSchema.findOneAndUpdate(
                {
                  _id: commands[0],
                },
                {
                  enabled: "true",
                },
                {
                  upsert: true,
                }
              );
            } else if (commandResult.enabled == "false") {
              return message.channel.send("This command has been disabled.");
            } else {

              //ensure correct perms
              for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                  message.reply(permissionError);
                }
              }

              //ensure roles
              for (const requoedRole of requiredRoles) {
                const role = message.guild.roles.cache.find(
                  (r) => r.name === requoedRole
                );

                if (!role || !message.member.roles.cache.has(role.id)) {
                  return message.channel.send(
                    `You must have the ${requoedRole} role to use this command`
                  );
                }
              }

              //create args

              const args = content.split(/[ ]+/);

              //remove the command first index
              args.shift();

              //ensure correct args
              if (
                args.length < minArgs ||
                (maxArgs !== null && args.length > maxArgs)
              ) {
                message.channel.send(`Use \`\`${prefix}${alias} ${expectedArgs}\`\``);
                return;
              }

              //handle code
              callback(message, args, Discord, client, mongo, args.join(" "));
            }
          } catch {
            mongoose.connection.close();
            console.log("Closed to prevent errors")
          }
        });

        //chest

        if (message.author.id != "804610350128955392" && message.author.id != "783789982300373053") {
          let randomAmount = Math.floor(Math.random() * 100) + 1;
          if (randomAmount == 12) {
            let filter = (m) => m.author.id === message.author.id;
            const userResult = await userSchema.findOne({ _id: message.member.user })
            if (!userResult || !userResult.money) return
            let chestAmount = 0
            let EmbedForE = new Discord.MessageEmbed()
              .setAuthor(`${message.member.displayName} | CLAIMED`, message.member.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
              .setDescription("You claimed a chest! Great job.")
              .setColor("GOLD")
              .setThumbnail("https://cdn.discordapp.com/attachments/974900127602974730/975300721937362965/chest.png")
            let EmbedFor = new Discord.MessageEmbed()
              .setAuthor(`${message.member.displayName} | FOUND A CHEST`, message.member.user.displayAvatarURL({ format: 'jpg', dynamic: true }))
              .setDescription("You found a chest. Type ``'claim'`` to claim before anyone else can.")
              .setColor("GOLD")
              .setThumbnail("https://cdn.discordapp.com/attachments/974900127602974730/975300721937362965/chest.png")
            if (!userResult.level || userResult.level == 0) {
              chestAmount = 20000
            } else if (userResult.level == 1) {
              chestAmount == 90000
              EmbedForE.setFooter("Level 1 gave you 70k extra")
            } else if (userResult.level == 2) {
              chestAmount == 500000
              EmbedForE.setFooter("Level 2 gave you 480k extra")
            } else if (userResult.level == 3) {
              chestAmount == 1000000
              EmbedForE.setFooter("Level 3 gave you 980k extra")
            } else if (userResult.level == 4) {
              chestAmount == 1500000
              EmbedForE.setFooter("Level 4 gave you 1m, 480k extra")
            } else if (userResult.level == 5) {
              chestAmount == 10000000
              EmbedForE.setFooter("Level 5 gave you 9m 980k extra")
            }
            message.channel.send(EmbedFor).then(() => {
              message.channel
                .awaitMessages(filter, {
                  max: 1,
                  time: 60000,
                  errors: ["time"],
                }).then(async (message) => {
                  message = message.first()
                  if (message.author.id != "804610350128955392" && message.author.id != "783789982300373053") {
                    if (message.content.toUpperCase() == "CLAIM") {
                      console.log(message.content.toUpperCase())
                      const newUserMoney = chestAmount + userResult.money
                      await userSchema.findOneAndUpdate(
                        {
                          _id: message.member.user,
                        },
                        {
                          money: newUserMoney,
                        },
                        {
                          upsert: true,
                        }
                      );
                      message.channel.send(EmbedForE)
                    }
                  }
                }).catch(error => {
                  message.channel.send("Nobody claimed the chest in time. *Black Bolt sadness*")
                })
            })
          }
        }
        return;
      }
    }
  });
};

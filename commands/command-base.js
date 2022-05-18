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
            } else {
              if (commandResult.enabled == "false") {
                return message.channel.send("This command has been disabled.");
              }
            }
          } finally {
            mongoose.connection.close();
          }
        });

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

        return;
      }
    }
  });
};

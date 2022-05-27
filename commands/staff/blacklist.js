const userSchema = require("../../schemas/userSchema");

module.exports = {
  commands: ["blacklist", "blackban", "black-list", "black-ban"],
  expectedArgs: "(user) (true/false)",
  permissionError: "This command is ``admin`` only",
  minArgs: 2,
  maxArgs: 2,
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
  callback: async (message, args, Discord, client, mongo) => {
    if(!message.member.roles.cache.has('838679476774371408')) {
      return message.channel.send("You cannot use that")
    }
    await mongo().then(async (mongoose) => {
      try {
        const user = message.mentions.members.first().user;
        if (!message.mentions.members.first()) {
          return message.channel.send("You must ping someone to black list!");
        }
        if (message.mentions.members.first().id == "555991737072615424") {
          return message.channel.send("This user cannot be black listed.");
        }
        if (
          args[1].toUpperCase() != "TRUE" &&
          args[1].toUpperCase() != "FALSE"
        ) {
          return message.channel.send(
            "You must specify true/false to black list."
          );
        }
        const userResult = await userSchema.findOne({ _id: user });

        let toSet;

        let embedForDone = new Discord.MessageEmbed()
          .setAuthor(
            `${message.mentions.members.first().displayName} | Black Listed`,
            user.displayAvatarURL({ format: "jpg", dynamic: true })
          )
          .setColor("BLACK")
          .setDescription("This user has been black listed");

        if (args[1] == "true") {
          toSet = "true";
        }
        if (args[1] == "false") {
          toSet = "false";
        }

        if (!userResult) {
          if (toSet == "false") {
            return message.channel.send(
              "This user is already not black listed"
            );
          }
          await userSchema.findOneAndUpdate(
            {
              _id: user,
            },
            {
              blacklisted: toSet,
            },
            {
              upsert: true,
            }
          );
          return message.channel.send(embedForDone);
        }

        if (userResult.blacklisted == "true" && toSet == "true") {
          return message.channel.send("This user is already black listed");
        }
        if (userResult.blacklisted == "false" && toSet == "false") {
          return message.channel.send("This user is already not black listed");
        }

        await userSchema.findOneAndUpdate(
          {
            _id: user,
          },
          {
            blacklisted: toSet,
          },
          {
            upsert: true,
          }
        );

        message.channel.send(embedForDone);

        const emedForUse = new Discord.MessageEmbed()
          .setAuthor(
            `${message.mentions.members.first().displayName} | Black Listed`
          )
          .setDescription("You can no longer use Black Bolt commands.")
          .setFooter(
            "If you believe this was done incorrectly please dm a moderator."
          )
          .setColor("BLACK");

        message.mentions.members
          .first()
          .send(emedForUse)
          .catch((err) => {
            return;
          });
      } finally {
        mongoose.connection.close();
      }
    });
  },
};

const commandSchema = require('../../schemas/commandSchema')
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['commandset', 'set'],
    expectedArgs: '(command) (true/false)',
    permissionError: "This command is ``admin`` only",
    minArgs: 2,
    maxArgs: 2,
    permissions: ["ADMINISTRATOR"],
    requiredRoles: [],
    callback: async (message, args, Discord, client, mongo) => {
        await mongo().then(async (mongoose) => {
            try {
                let seter 
                let sender
                if(args[1] == "true") {
                    seter = "true"
                    sender = "enabled"
                } else if(args[1] == "false") {
                    seter = "false"
                    sender = "disabled"
                } else {
                    return message.channel.send("Please sepcify ``true/false``")
                }
                await commandSchema.findOneAndUpdate(
                    {
                      _id: args[0],
                    },
                    {
                      enabled: seter,
                    },
                    {
                      upsert: true,
                    }
                  );
                  message.channel.send(`${args[0]} command ${sender}`)
            } finally {
                mongoose.connection.close();
            }
        });
    }
}
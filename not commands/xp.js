const userSchema = require('.././schemas/userSchema')
const serverSchema = require('.././schemas/Servers')
const mongo = require('../mongo')

module.exports = (client) => {
    client.on('message', async message => {
        if (message.guild != "804323987106168842") return
        if (message.channel == "838588912041066496") return
        await mongo().then(async (mongoose) => {
            try {
                const user = message.member.user
                const userResult = await userSchema.findOne({ _id: user })
                const serverResult = await serverSchema.findOne({ _id: "804323987106168842" })
                let xp = Math.floor(Math.random() * 1000);
                //CANNOT READ MUTIPLYER BC CANNOT FIND SERVER
                if(serverResult.mutiplyer == "true") {
                    xp = xp * 2
                }
                if(!userResult || !userResult.xp) {
                    xp = 10
                }

                if(userResult.mutiplyer == "true") {
                    xp = xp * 2
                }
                
                await userSchema.findOneAndUpdate(
                    {
                      _id: user,
                    },
                    {
                      xp: xp,
                    },
                    {
                      upsert: true,
                    }
                  );
            } finally {
                mongoose.connection.close()
            }
        })
    })
}
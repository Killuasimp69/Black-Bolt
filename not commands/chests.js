const Discord = require("discord.js");
const mongo = require("../mongo");
const userSchema = require("../schemas/userSchema");

module.exports = (client) => {
    client.on('message', async message => {
        if(message.channel.id == "853386908376629309" || message.channel.id == "838588912041066496") return
        setTimeout(async() => {
            await mongo().then(async (mongoose) => {
                try {
                    if (
                        message.author.id != "804610350128955392" &&
                        message.author.id != "783789982300373053"
                    ) {
                        let randomAmount = Math.floor(Math.random() * 150) + 1;
                        if (randomAmount == 12) {
                            let filter = (m) => m.author.id === message.author.id;
                            const userResult = await userSchema.findOne({
                                _id: message.member.user,
                            });
                            if (!userResult || !userResult.money) return message.reply("You would have just gotten a chest, but since you've never used our economy it was voided (canceld)");
                            let chestAmount = 0;
                            let EmbedForE = new Discord.MessageEmbed()
                                .setAuthor(
                                    `${message.member.displayName} | CLAIMED`,
                                    message.member.user.displayAvatarURL({
                                        format: "jpg",
                                        dynamic: true,
                                    })
                                )
                                .setColor("GOLD")
                                .setThumbnail(
                                    "https://cdn.discordapp.com/attachments/974900127602974730/975300721937362965/chest.png"
                                );
                            let EmbedFor = new Discord.MessageEmbed()
                                .setAuthor(
                                    `${message.member.displayName} | FOUND A CHEST`,
                                    message.member.user.displayAvatarURL({
                                        format: "jpg",
                                        dynamic: true,
                                    })
                                )
                                .setDescription(
                                    "You found a chest. Type ``'claim'`` to claim before anyone else can."
                                )
                                .setColor("GOLD")
                                .setThumbnail(
                                    "https://cdn.discordapp.com/attachments/974900127602974730/975300721937362965/chest.png"
                                );
                            if (!userResult.level || userResult.level == 0) {
                                chestAmount = 20000;
                                EmbedForE.setDescription(
                                    "You claimed a chest! Great job. You made **20k**"
                                );
                            } else if (userResult.level == 1) {
                                chestAmount = 100000;
                                EmbedForE.setFooter("Level 1 gave you 70k extra");
                                EmbedForE.setDescription(
                                    "You claimed a chest! Great job. You made **100k**"
                                );
                            } else if (userResult.level == 2) {
                                chestAmount = 500000;
                                EmbedForE.setFooter("Level 2 gave you 480k extra");
                                EmbedForE.setDescription(
                                    "You claimed a chest! Great job. You made **500k**"
                                );
                            } else if (userResult.level == 3) {
                                chestAmount = 1000000;
                                EmbedForE.setFooter("Level 3 gave you 980k extra");
                                EmbedForE.setDescription(
                                    "You claimed a chest! Great job. You made **1m**"
                                );
                            } else if (userResult.level == 4) {
                                chestAmount = 1500000;
                                EmbedForE.setFooter("Level 4 gave you 1m, 480k extra");
                                EmbedForE.setDescription(
                                    "You claimed a chest! Great job. You made **1.5m**"
                                );
                            } else if (userResult.level == 5) {
                                chestAmount = 10000000;
                                EmbedForE.setFooter("Level 5 gave you 9m 980k extra");
                                EmbedForE.setDescription(
                                    "You claimed a chest! Great job. You made **10m**"
                                );
                            }
                            message.channel.send(EmbedFor).then(() => {
                                message.channel
                                    .awaitMessages(filter, {
                                        max: 1,
                                        time: 60000,
                                        errors: ["time"],
                                    })
                                    .then(async (message) => {
                                        message = message.first();
                                        if (
                                            message.author.id != "804610350128955392" &&
                                            message.author.id != "783789982300373053"
                                        ) {
                                            if (message.content.toUpperCase() == "CLAIM") {
                                                console.log(chestAmount)
                                                const newUserMoney =
                                                    chestAmount + userResult.money;
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
                                                message.channel.send(EmbedForE);
                                            }
                                        }
                                    })
                                    .catch((error) => {
                                        message.channel.send(
                                            "Nobody claimed the chest in time. *Black Bolt sadness*"
                                        );
                                    });
                            });
                        }
                    }
                } catch {
                    mongoose.connection.close()
                    console.log("ISSUE IN CHESTS")
                }
            }, 800)
        })
    })
}
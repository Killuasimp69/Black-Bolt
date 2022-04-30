const { prefix } = require('../../config.json')
const itemSchema = require("../../schemas/ItemSchema")

module.exports = {
    commands: ['batch'],
    expectedArgs: '',
    minArgs: 0,
    callback: async (message, args, Discord, client, mongo) => {
        await mongo().then(async (mongoose) => {
            try { 
                //test%batch (worth) (name) (type) (image)
                const ID1 = Math.floor(Math.random() * (10000000000 - 100000) + 100000)
                const ID2 = Math.floor(Math.random() * (10000000000 - 100000) + 100000)
                const ID3 = Math.floor(Math.random() * (10000000000 - 100000) + 100000)
                const ID4 = Math.floor(Math.random() * (10000000000 - 100000) + 100000)
                const ID5 = Math.floor(Math.random() * (10000000000 - 100000) + 100000)

                await itemSchema.findOneAndUpdate({
                    _id: ID1
                }, {
                    owner: "false"
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID1
                }, {
                    worth: args[0]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID1
                }, {
                    name: args[1]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID1
                }, {
                    type: args[2]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID1
                }, {
                    image: args[3]
                }, {
                    upsert: true
                })

                await itemSchema.findOneAndUpdate({
                    _id: ID2
                }, {
                    owner: "false"
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID2
                }, {
                    worth: args[0]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID2
                }, {
                    name: args[1]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID2
                }, {
                    type: args[2]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID2
                }, {
                    image: args[3]
                }, {
                    upsert: true
                })

                await itemSchema.findOneAndUpdate({
                    _id: ID3
                }, {
                    owner: "false"
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID3
                }, {
                    worth: args[0]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID3
                }, {
                    name: args[1]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID3
                }, {
                    type: args[2]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID3
                }, {
                    image: args[3]
                }, {
                    upsert: true
                })

                await itemSchema.findOneAndUpdate({
                    _id: ID4
                }, {
                    owner: "false"
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID4
                }, {
                    worth: args[0]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID4
                }, {
                    name: args[1]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID4
                }, {
                    type: args[2]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID4
                }, {
                    image: args[3]
                }, {
                    upsert: true
                })

                await itemSchema.findOneAndUpdate({
                    _id: ID5
                }, {
                    owner: "false"
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID5
                }, {
                    worth: args[0]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID5
                }, {
                    name: args[1]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID5
                }, {
                    type: args[2]
                }, {
                    upsert: true
                })
                await itemSchema.findOneAndUpdate({
                    _id: ID5
                }, {
                    image: args[3]
                }, {
                    upsert: true
                })

                message.channel.send("done")
            } finally {
                mongoose.connection.close()

            }
        })
    }
}
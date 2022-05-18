const commandSchema = require('../../schemas/commandSchema')
const { prefix } = require('../../config.json')
const mongo = require("../../mongo")

module.exports = {
    commands: ['seter'],
    expectedArgs: '(command)',
    permissionError: "You need more permissions",
    minArgs: 1,
    maxArgs: 1,
    permissions: [],
    requiredRoles: ["========= Staff ==========="],
    callback: (message, args, Discord, client, mongo) => {
        await mongo().then(async (mongoose) => {
            try {
                const commandResult
            } finally {
                mongoose.connection.close()
            }
    }
}
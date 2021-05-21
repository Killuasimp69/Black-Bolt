const { version } = require('../../config.json')
const { MemeArcade } = require('../../index')
module.exports = async () => {
    console.log('Please wait... Checking bot information.')
    setTimeout(() => {
        console.log('==========================')
        console.log('BOT INFO')
        console.log('==========================')
        console.log(`Bot Name: Black Bolt`)
        console.log(`Bot Version: ${version}`)
        console.log(`Status: Chagning Statuses`) 
        console.log(`Member Count (Meme Arcade): ${MemeArcade}`)
    }, 10000)
}
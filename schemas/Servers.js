// @ts-nocheck
const mongoose = require('mongoose')

const ServersSchema = mongoose.Schema({

   _id: {
      type: String,
      required: true,
   }, 
   confessionsTrueFalse: {
      type: String,
      required: true,
   },
   confessions: {
      type: String,
      required: true,
   },
   confessHereChannel: {
      type: String,
      required: true,
   },
   confessionChannel: {
      type: String,
      required: true,
   },
   mutiplyer: {
      type: String,
      default: "false",
      required: true
   }
})

module.exports = mongoose.model('Servers', ServersSchema)
// @ts-nocheck
const mongoose = require('mongoose')

const ServersSchema = mongoose.Schema({

   _id: {
      type: String,
      required: true,
   }, 
   confessions: {
      type: String,
      required: true,
   },
   mutiplyer: {
      type: String,
      default: "false",
      required: true
   },
   maxbetamt: {
      type: Number,
      default: 10000000,
      required: true
   }
})

module.exports = mongoose.model('Servers', ServersSchema)
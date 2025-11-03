const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
  
    _id:String,   // this is for using i am events and booking
    seq: {type:Number,default:0}


});

const Counter = mongoose.model('Counter',counterSchema)


module.exports = Counter
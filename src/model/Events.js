const mongoose = require('mongoose')


const eventSchema = mongoose.Schema({

    eventId :{type:String,unique:true},
    title:String,
    description:String,
    organizer:{type:mongoose.Schema.Types.ObjectId,
    ref:'User'   
    },
    city:String,
    tags:[String],
    date:Date,
    price:Number,
    totalSeats:Number,
    status:{type:String,enum:["DRAFT","PUBLISHED",'CANCELLED'],default:'DRAFT'}



},{timestamps:true})


module.exports = mongoose.model('Event',eventSchema)    
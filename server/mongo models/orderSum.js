const mongoose = require('mongoose');
const Schema = mongoose.Schema; //the schema define the structure of our saved data

const sumSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    totalCashReceived:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    change:{
        type:Number,
        required:true
    },
    detailes:{
        type:Object,
        required:true
    },
},{timestamps:true});

const Sum = mongoose.model('order', sumSchema);
module.exports = Sum;
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //the schema define the structure of our saved data

const menuesSchema = new Schema({
    menues:{
        type:Object,
        required:true
    }
},{timestamps:true});

const menues = mongoose.model('menues', menuesSchema);
module.exports = menues;
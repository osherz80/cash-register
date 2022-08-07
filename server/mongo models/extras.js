const mongoose = require('mongoose');
const Schema = mongoose.Schema; //the schema define the structure of our saved data

const extrasSchema = new Schema({
    extras:{
        type:Object,
        required:true
    }
},{timestamps:true});

const extras = mongoose.model('extras', extrasSchema);
module.exports = extras;
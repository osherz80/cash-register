// const mongoose = require('mongoose');
// const Schema = mongoose.Schema; //the schema define the structure of our saved data

// const adminsSchema = new Schema({
//     admins:{
//         type:Object,
//         required:true
//     }
// },{timestamps:true});

// const admins = mongoose.model('admins', adminsSchema);
// module.exports = admins;

const mongoose = require('mongoose');
const Joi = require('joi');

const adminSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
}, { timestamps: true });

const admin = mongoose.model('admins', adminSchema);
module.exports = admin;



